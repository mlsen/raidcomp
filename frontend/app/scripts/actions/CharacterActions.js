import alt from '../alt';

class CharacterActions {

  add(character) {
    this.dispatch(character);
  }

  delete(characterId) {
    this.dispatch(characterId);
  }

  move(characterId, raidId) {
    this.dispatch({
      characterId: characterId,
      raidId: raidId
    });
  }

  fetch(hash) {
    // Request
    this.dispatch(hash);
  }

}

export default alt.createActions(CharacterActions);
