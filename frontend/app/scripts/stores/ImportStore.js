import Immutable from 'immutable';
import alt from '../alt';
import ImportActions from '../actions/ImportActions';
import CharacterActions from '../actions/CharacterActions';
import { classes } from '../misc/wow';

const classIds = {
  1: classes.WARRIOR,
  2: classes.PALADIN,
  3: classes.HUNTER,
  4: classes.ROGUE,
  5: classes.PRIEST,
  6: classes.DEATHKNIGHT,
  7: classes.SHAMAN,
  8: classes.MAGE,
  9: classes.WARLOCK,
  10: classes.MONK,
  11: classes.DRUID
};

class ImportStore {

  constructor() {
    this.state = {};
    this.state.realms = Immutable.Map();
    this.state.ranks = Immutable.Map();
    this.state.errorMessage = null;

    this.bindListeners({
      handleUpdateMembers: ImportActions.UPDATE_MEMBERS,
      handleFetchGuildFailed: ImportActions.FETCH_GUILD_FAILED,
      handleUpdateRealms: ImportActions.UPDATE_REALMS,
      handleFetchRealmsFailed: ImportActions.FETCH_REALMS_FAILED,
      handleImportRanks: ImportActions.IMPORT_RANKS
    });
  }

  handleUpdateMembers(props) {
    let ranks = {};
    let character = {};
    props.members.map(member => {
      if(!ranks.hasOwnProperty(member.rank)) {
        ranks[member.rank] = [];
      }
      character = {
        region: props.guild.region,
        realm: props.guild.realm,
        name: member.character.name,
        class: classIds[member.character.class]
      };
      ranks[member.rank].push(character);
    });
    this.state.ranks = Immutable.fromJS(ranks);
  }

  handleFetchGuildFailed(err) {
    console.log('Error:', err);
    this.state.errorMessage = 'Guild data could not be fetched.';
  }

  handleUpdateRealms(props) {
    const { region, realms } = props;

    let strippedRealms = [];
    realms.map(realm => {
      strippedRealms.push({
        name: realm.name,
        slug: realm.slug
      });
    });
    this.state.realms = this.state.realms.set(region, Immutable.fromJS(strippedRealms));
  }

  handleFetchRealmsFailed(err) {
    console.log('Error:', err);
    this.state.errorMessage = 'Realm data could not be fetched.';
  }

  handleImportRanks(ranks) {
    let key = null;
    let characters = [];

    ranks.forEach(rank => {
      key = rank.toString();

      this.state.ranks.get(key).map(character => {
        characters.push(character);
      });
    });
    this.state.importCharacters = Immutable.fromJS(characters);
  }

}

export default alt.createStore(ImportStore, 'ImportStore');
