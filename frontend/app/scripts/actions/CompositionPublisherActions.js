import alt from '../alt';

class CompositionPublisherActions {

  addCharacter(character) {
    this.dispatch(character);
  }

  removeCharacter(characterId) {
    this.dispatch(characterId);
  }

  moveCharacter(characterId, raidId) {
    this.dispatch({
      characterId: characterId,
      raidId: raidId
    });
  }

  addRaid() {
    this.dispatch();
  }

  removeRaid(raidId) {
    this.dispatch(raidId);
  }

  importStaging() {
    this.dispatch();
  }
}

export default alt.createActions(CompositionPublisherActions);
