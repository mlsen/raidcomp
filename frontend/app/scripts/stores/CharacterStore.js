import Immutable from 'immutable';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';

class CharacterStore {

  constructor() {
    this.state = {};
    this.state.characters = Immutable.fromJS([
      { name: 'Hildchen' },
      { name: 'Traudchen' },
      { name: 'Marlene' },
      { name: 'Tilde' }
    ]);
    this.state.raid = Immutable.fromJS([]);

    this.bindListeners({
      handleAdd: CharacterActions.ADD
    });
  }

  handleAdd(character) {
    this.setState({
      characters: this.state.characters.pop(),
      raid: this.state.raid.push(Immutable.fromJS(character))
    });
  }
}

export default alt.createStore(CharacterStore, 'CharacterStore');
