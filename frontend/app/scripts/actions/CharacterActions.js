import alt from '../alt';

class CharacterActions {

  create(character) {
    this.dispatch(character);
  }

  delete(characterId) {
    this.dispatch(characterId);
  }

}

export default alt.createActions(CharacterActions);
