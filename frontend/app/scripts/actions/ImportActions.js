import alt from '../alt';
import Backend from '../misc/backendApi';


class ImportActions {

  fetchRealms(region) {
    this.dispatch();
    Backend.fetchRealms(region)
      .then(response => {
        this.actions.updateRealms({
          region: region,
          realms: response.realms
        });
      })
      .catch(err => {
        this.actions.fetchFailed({
          message: 'Could not retrieve realm data.'
        });
      });
  }

  fetchGuild(region, realm, guild) {
    this.dispatch();
    Backend.fetchGuild(region, realm, guild)
      .then(response => {
        this.actions.updateGuild({
          region: region,
          realm: realm,
          guild: response
        });
      })
      .catch(err => {
        this.actions.fetchFailed({
          message: 'Could not retrieve guild data.'
        });
      });
  }

  fetchCharacter(region, realm, character) {
    this.dispatch({
      region: region,
      realm: realm,
      character: character
    });
  }

  fetchFailed(err) {
    this.dispatch(err);
  }

  updateRealms(props) {
    this.dispatch(props);
  }

  updateGuild(props) {
    this.dispatch(props);
  }

  selectGuildRank(rank) {
    this.dispatch(rank);
  }

}

export default alt.createActions(ImportActions);
