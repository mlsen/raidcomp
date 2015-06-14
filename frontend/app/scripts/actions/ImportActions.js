import alt from '../alt';
import Armory from '../misc/armoryApi';
import CompositionActions from './CompositionActions';

const timeout = 5000;

class ImportActions {

  fetchGuild(region, realm, name) {
    this.dispatch();

    // Dirty hack because jsonp doesn't allow proper error handling
    const failure = setTimeout(() => {
      this.actions.fetchGuildFailed({
        msg: 'Operation timed out.'
      });
    }, timeout);

    Armory.fetchGuild(region, realm, name)
      .then(guild => {

        // Dirty hack..
        clearTimeout(failure);

        this.actions.updateMembers({
          region: region,
          realm: realm,
          guild: name
        },
        guild.members);
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
    this.dispatch();

    // Dirty hack because jsonp doesn't allow proper error handling
    const failure = setTimeout(() => {
      this.actions.fetchGuildFailed({
        msg: 'Operation timed out.'
      });
    }, timeout);

    Armory.fetchRealms(region)
      .then(response => {

        // hack
        clearTimeout(failure);

        this.actions.updateRealms(region, response.realms);
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
    CompositionActions.import();
  }

}

export default alt.createActions(ImportActions);
