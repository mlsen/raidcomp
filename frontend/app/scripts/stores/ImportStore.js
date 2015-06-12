import Immutable from 'immutable';
import alt from '../alt';
import ImportActions from '../actions/ImportActions';
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
    this.state.ranks = Immutable.Map();

    this.bindListeners({
      handleUpdateMembers: ImportActions.UPDATE_MEMBERS,
      handleFetchGuildFailed: ImportActions.FETCH_GUILD_FAILED
    });
  }

  handleUpdateMembers(members) {
    let ranks = {};
    let character = {};
    members.map(member => {
      if(!ranks.hasOwnProperty(member.rank)) {
        ranks[member.rank] = [];
      }
      character = {
        name: member.character.name,
        class: classIds[member.character.class]
      };
      ranks[member.rank].push(character);
    });
    this.state.ranks = Immutable.fromJS(ranks);
  }

  handleFetchGuildFailed(err) {
    console.log(err);
  }

}

export default alt.createStore(ImportStore, 'ImportStore');
