import Immutable from 'immutable';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';

const Character = Immutable.Record({
  id: null,
  currentRaidId: null,
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
    const newRaidId = props.raidId;
    const oldRaidId = props.character.get('currentRaidId');
    let character = props.character;

    console.log(newRaidId, oldRaidId, character);

    // Remove from old raid
    if(oldRaidId !== null) {
      let oldRaid = this.state.raids.get(oldRaidId.toString());
      oldRaid.characters = oldRaid.characters.delete(character.id.toString());
      this.state.raids = this.state.raids.set(oldRaidId.toString(), oldRaid);
    }

    // Add to new raid
    let newRaid = this.state.raids.get(newRaidId.toString());
    character = props.character.set('currentRaidId', newRaidId);
    newRaid.characters = newRaid.characters.set(character.id.toString(), character);

    this.state.raids = this.state.raids.set(newRaidId.toString(), newRaid);

    this.setState({
      characters: this.state.characters.delete(character.id.toString())
    });
  }

  handleRemoveFromRaid(props) {
    const { raidId, characterId } = props;
    let raid = this.state.raids.get(raidId.toString());

    let character = raid.characters.get(characterId.toString());
    character = character.set('currentRaidId', null);

    raid.characters = raid.characters.delete(characterId.toString());

    this.setState({
      characters: this.state.characters.set(characterId.toString(), character),
      raids: this.state.raids.set(raidId.toString(), raid)
    });
  }

}

export default alt.createStore(CharacterStore, 'CharacterStore');
