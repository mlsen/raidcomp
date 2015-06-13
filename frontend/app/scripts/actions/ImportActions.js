import alt from '../alt';
import Armory from '../misc/armoryApi';
import CharacterActions from './CharacterActions';

class ImportActions {

  fetchGuild(region, realm, name) {
    this.dispatch();

    Armory.fetchGuild(region, realm, name)
      .then(guild => {
        this.actions.updateMembers({
          region: region,
          realm: realm,
          guild: name
        },
        guild.members);
      })
      .fail(err => {
        this.actions.fetchGuildFailed(err);
      });
  }

  updateMembers(guild, members) {
    this.dispatch({
      guild: guild,
      members: members
    });
  }

  fetchGuildFailed(err) {
    this.dispatch(err);
  }

  fetchRealms(region) {
    Armory.fetchRealms(region)
      .then(response => {
        this.actions.updateRealms(region, response.realms);
      })
      .fail(err => {
        this.actions.fetchRealmsFailed(err);
      });
  }

  updateRealms(region, realms) {
    this.dispatch({
      region: region,
      realms: realms
    });
  }

  fetchRealmsFailed(err) {
    this.dispatch(err);
  }

  importRanks(ranks) {
    this.dispatch(ranks);
    CharacterActions.import();
  }

}

export default alt.createActions(ImportActions);
