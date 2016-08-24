import Immutable from 'immutable';
import alt from '../alt.jsx';
import CompositionActions from '../actions/CompositionActions';
import ImportActions from '../actions/ImportActions';
import AppStore from './AppStore';
import actions from '../misc/socketActions';
import { classes, getRoleForSpec } from '../misc/wow';

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
  11: classes.DRUID,
  12: classes.DEMONHUNTER
};

function makeCharacter(region, realm, character) {
  const className = classIds[character.class];
  const spec = character.hasOwnProperty('spec') ? character.spec.name : null;

  return {
    // Determines whether the character needs to be single-fetched
    complete: !!character.ilvl || false,

    region: region,
    realm: realm,
    name: character.name,
    className: className,
    spec: spec,
    role: getRoleForSpec(className, spec),
    ilvl: character.ilvl || null
  };
}

class ImportStore {

  constructor() {
    this.bindListeners({
      handleFetchRealms: ImportActions.FETCH_REALMS,
      handleFetchGuild: ImportActions.FETCH_GUILD,
      handleFetchCharacter: ImportActions.FETCH_CHARACTER,
      handleFetchFailed: ImportActions.FETCH_FAILED,

      handleUpdateRealms: ImportActions.UPDATE_REALMS,
      handleUpdateGuild: ImportActions.UPDATE_GUILD,

      handleSelectGuildRank: ImportActions.SELECT_GUILD_RANK
    });

    this.state = {};
    this.state.loading = false;
    this.state.error = null;

    this.state.realms = Immutable.Map();

    this.state.guild = {
      members: Immutable.Map(),
      selectedRanks: Immutable.Set()
    };

    this.state.staging = Immutable.List();
  }

  handleFetchFailed(err) {
    this.setState({ loading: false, error: err });
  }

  handleFetchRealms() {
    this.setState({ loading: true, error: null });
  }

  handleUpdateRealms(props) {
    const { region, realms } = props;
    this.state.realms = this.state.realms.set(region, Immutable.List(realms));
    this.state.loading = false;
    this.state.error = null;
  }

  handleFetchGuild() {
    this.state.guild.selectedRanks = Immutable.Set();
    this.state.loading = true;
    this.state.error = null;
  }

  handleUpdateGuild(props) {
    const { region, realm, guild } = props;
    let members = {};

    guild.members.map(member => {
      if(!members.hasOwnProperty(member.rank)) {
        members[member.rank] = [];
      }

      let character = makeCharacter(region, realm, member.character);
      members[member.rank].push(character);
    });

    this.state.guild.members = Immutable.Map(members);
    this.state.loading = false;
    this.state.error = null;
  }

  handleFetchCharacter() {
    this.setState({ loading: true, error: null });
  }

  handleSelectGuildRank(rank) {
    this.state.guild.selectedRanks = (
      this.state.guild.selectedRanks.has(rank) ?
      this.state.guild.selectedRanks.delete(rank) :
      this.state.guild.selectedRanks.add(rank)
    );

    let staging = [];
    this.state.guild.selectedRanks.map(rank => {
      staging = staging.concat(this.state.guild.members.get(rank));
    });
    this.state.staging = Immutable.List(staging);
  }

}

export default alt.createStore(ImportStore, 'ImportStore');
