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
      .catch(err => {
        this.actions.fetchGuildFailed(err);
      });
  }

  importRanks(ranks) {
    this.dispatch(ranks);
    CharacterActions.import();
  }

  updateMembers(guild, members) {
    this.dispatch({ guild: guild, members: members });
  }

  fetchGuildFailed(err) {
    this.dispatch(err);
  }

}

export default alt.createActions(ImportActions);
