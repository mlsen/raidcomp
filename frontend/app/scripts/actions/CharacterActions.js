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

  import() {
    this.dispatch();
  }

}

export default alt.createActions(CharacterActions);
