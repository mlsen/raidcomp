import alt from '../alt';
import Armory from '../misc/armoryApi';

class ImportActions {

  fetchGuild(region, realm, name) {
    this.dispatch();

    Armory.fetchGuild(region, realm, name)
      .then(guild => {
        this.actions.updateMembers(guild.members);
      })
      .catch(err => {
        this.actions.fetchGuildFailed(err);
      });
  }

  updateMembers(members) {
    this.dispatch(members);
  }

  fetchGuildFailed(err) {
    this.dispatch(err);
  }

}

export default alt.createActions(ImportActions);
