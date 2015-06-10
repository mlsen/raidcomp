import alt from '../alt';

class RaidActions {

  create() {
    this.dispatch();
  }

  delete(raidId) {
    this.dispatch(raidId);
  }

  addCharacter(raidId, character) {
    this.dispatch({
      raidId: raidId,
      character: character
    });
  }

  removeCharacter(raidId, characterId) {
    this.dispatch({
      raidId: raidId,
      characterId: characterId
    });
  }

}

export default alt.createActions(RaidActions);
