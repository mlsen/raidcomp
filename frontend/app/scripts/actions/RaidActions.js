import alt from '../alt';

class RaidActions {

  add() {
    this.dispatch();
  }

  delete(raidId) {
    this.dispatch(raidId);
  }

  fetch(hash) {
    // Request
    this.dispatch();
  }

}

export default alt.createActions(RaidActions);
