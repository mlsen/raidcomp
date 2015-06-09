import alt from '../alt';

class CharacterActions {

  add(character) {
    console.log('Add:', character);
    this.dispatch(character);
  }

}

export default alt.createActions(CharacterActions);
