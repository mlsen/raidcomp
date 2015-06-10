import Immutable from 'immutable';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';

const Character = Immutable.Record({
  id: null,
  name: null
});

class CharacterStore {

  constructor() {
    this.nextCharacterId = 1;
    this.nextRaidId = 1;

    this.state = {};
    this.state.characters = Immutable.Map();
    this.state.raids = Immutable.Map();

    this.bindListeners({
      handleCreateCharacter: CharacterActions.CREATE,
      handleDeleteCharacter: CharacterActions.DELETE,
      handleCreateRaid: RaidActions.CREATE,
      handleDeleteRaid: RaidActions.DELETE,
      handleAddToRaid: RaidActions.ADD_CHARACTER,
      handleRemoveFromRaid: RaidActions.REMOVE_CHARACTER
    });
  }

  handleCreateCharacter(character) {
    const id = this.nextRaidId++;
    character = new Character({
      id: id,
      name: character.name
    });

    this.setState({
      characters: this.state.characters.set(id.toString(), character)
    });
  }

  handleDeleteCharacter(characterId) {
    this.setState({
      characters: this.state.characters.delete(characterId.toString())
    });
  }

  handleCreateRaid() {
    const id = this.nextRaidId++;
    const raid = {
      id: id,
      characters: Immutable.Map()
    };

    this.setState({
      raids: this.state.raids.set(id.toString(), raid)
    });
  }

  handleDeleteRaid(raidId) {
    this.setState({
      raids: this.state.raids.delete(raidId.toString())
    });
  }

  handleAddToRaid(props) {
    const { raidId, character } = props;
    let raid = this.state.raids.get(raidId.toString());
    raid.characters = raid.characters.set(character.id.toString(), character);

    this.setState({
      characters: this.state.characters.delete(character.id.toString()),
      raids: this.state.raids.set(raidId.toString(), raid)
    });
  }

  handleRemoveFromRaid(props) {
    const { raidId, characterId } = props;
    let raid = this.state.raids.get(raidId.toString());
    const character = raid.characters.get(characterId.toString());

    raid.characters = raid.characters.delete(characterId.toString());

    this.setState({
      characters: this.state.characters.set(characterId.toString(), character),
      raids: this.state.raids.set(raidId.toString(), raid)
    });
  }

}

export default alt.createStore(CharacterStore, 'CharacterStore');
