import alt from '../alt';

class CharacterActions {

  create(character) {
    this.dispatch(character);
  }

  delete(characterId) {
    this.dispatch(characterId);
  }

  fetch(hash) {
    // Request
    this.dispatch(hash);
  }

}

export default alt.createActions(CharacterActions);
