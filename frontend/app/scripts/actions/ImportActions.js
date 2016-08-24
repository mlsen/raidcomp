import alt from '../alt.jsx';
import Backend from '../misc/backendApi';


class ImportActions {

  fetchRealms(region) {
    Backend.fetchRealms(region)
      .then(response => {
        this.updateRealms({
          region: region,
          realms: response.realms
        });
      })
      .catch(err => {
        this.fetchFailed({
          message: 'Could not retrieve realm data.'
        });
      });
    return false;
  }

  fetchGuild(region, realm, guild) {
    Backend.fetchGuild(region, realm, guild)
      .then(response => {
        this.updateGuild({
          region: region,
          realm: realm,
          guild: response
        });
      })
      .catch(err => {
        this.fetchFailed({
          message: 'Could not retrieve guild data.'
        });
      });
    return false;
  }

  fetchCharacter(region, realm, character) {
    return {
      region: region,
      realm: realm,
      character: character
    };
  }

  fetchFailed(err) {
    return err;
  }

  updateRealms(props) {
    return props;
  }

  updateGuild(props) {
    return props;
  }

  selectGuildRank(rank) {
    return rank;
  }

}

export default alt.createActions(ImportActions);
