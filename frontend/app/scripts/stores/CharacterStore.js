import Immutable from 'immutable';
import sha1 from 'sha1';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';
import ImportStore from './ImportStore';

import { generateRandomCharacter } from '../misc/tools';

const Character = Immutable.Record({
  id: null,
  currentRaidId: 0,
  name: null,
  region: null,
  realm: null,
  class: null
});

function isValidCharacter(character) {
  return character.name && character.class && character.region && character.realm;
}

class CharacterStore {

  constructor() {
    // These are getting incremented
    this.nextRaidId = 1;

    this.state = {

      // All characters
      characters: Immutable.OrderedMap(),

      // Raids
      // Key '0' contains all characters that are not in a raid yet
      raids: Immutable.OrderedMap({
        0: { id: 0, characters: Immutable.OrderedMap() }
      })
    };

    this.bindListeners({
      handleAddCharacter: CharacterActions.ADD,
      handleDeleteCharacter: CharacterActions.DELETE,
      handleMoveCharacter: CharacterActions.MOVE,
      handleImportCharacters: CharacterActions.IMPORT,
      handleAddRaid: RaidActions.ADD,
      handleDeleteRaid: RaidActions.DELETE
    });
  }

  handleAddCharacter(character) {
    if(!character || !isValidCharacter(character)) {
      // Probably needs some error handling at this point
      return;
    }

    // The character id is a unique hash over region, realm and name
    character.id = sha1(character.region + character.realm + character.name);
    if(this.state.characters.has(character.id)) {
      return;
    }

    character = new Character(character);
    // Add to all characters
    this.state.characters = this.state.characters.set(character.id, character);

    // Add to raid '0'
    let raid = this.state.raids.get('0');
    raid.characters = raid.characters.set(character.id, character);
    this.state.raids = this.state.raids.set('0', raid);
  }

  handleDeleteCharacter(characterId) {
    const character = this.state.characters.get(characterId);

    // Delete from all characters
    this.state.characters = this.state.characters.delete(characterId);

    // Delete from current raid
    let raid = this.state.raids.get(character.currentRaidId.toString());
    raid.characters = raid.characters.delete(character.id);
    this.state.raids = this.state.raids.set(raid.id.toString(), raid);
  }

  handleMoveCharacter(props) {
    const { characterId, raidId } = props;
    let character = this.state.characters.get(characterId);

    // Delete from current raid
    let currentRaid = this.state.raids.get(character.currentRaidId.toString());
    currentRaid.characters = currentRaid.characters.delete(character.id);

    // Add to new raid
    let newRaid = this.state.raids.get(raidId.toString());
    character = character.set('currentRaidId', newRaid.id);
    newRaid.characters = newRaid.characters.set(character.id, character);

    let updatedRaids = {};
    updatedRaids[currentRaid.id.toString()] = currentRaid;
    updatedRaids[newRaid.id.toString()] = newRaid;

    this.state.characters = this.state.characters.set(character.id, character);
    this.state.raids.merge(updatedRaids);
  }

  handleAddRaid() {
    const raid = {
      id: this.nextRaidId++,
      characters: Immutable.OrderedMap()
    };
    this.state.raids = this.state.raids.set(raid.id.toString(), raid);
  }

  handleDeleteRaid(raidId) {
    this.state.raids = this.state.raids.delete(raidId.toString());
  }

  handleImportCharacters() {
    this.waitFor(ImportStore);
    const importCharacters = ImportStore.getState().importCharacters;

    importCharacters.map(character => {
      this.handleAddCharacter(character.toObject());
    });
  }

}

export default alt.createStore(CharacterStore, 'CharacterStore');
