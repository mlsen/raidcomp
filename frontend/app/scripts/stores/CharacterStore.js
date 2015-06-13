import Immutable from 'immutable';
import sha1 from 'sha1';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';
import ImportStore from './ImportStore';
import { getTokenForClass, tokens } from '../misc/wow';


const Character = Immutable.Record({
  id: null,
  currentRaidId: 0,
  name: null,
  region: null,
  realm: null,
  class: null,
  spec: null,
  role: null
});

function isValidCharacter(character) {
  return (
    character.name &&
    character.class &&
    character.region &&
    character.realm
  );
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
        0: {
          id: 0,
          characters: Immutable.OrderedMap(),
          tokens: Immutable.Map()
        }
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
    character.id = sha1(
      character.region.toLowerCase() +
      character.realm.toLowerCase() +
      character.name.toLowerCase()
    );
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
    console.log('handleMoveCharacter CharacterId:', characterId);
    let character = this.state.characters.get(characterId);

    console.log('handleMoveCharacter Character:', character);

    const token = getTokenForClass(character.class);

    // Delete from current raid
    let currentRaid = this.state.raids.get(character.currentRaidId.toString());
    currentRaid.characters = currentRaid.characters.delete(character.id);
    currentRaid.tokens = currentRaid.tokens.set(token, currentRaid.tokens.get(token) - 1);

    // Add to new raid
    let newRaid = this.state.raids.get(raidId.toString());
    character = character.set('currentRaidId', newRaid.id);
    newRaid.characters = newRaid.characters.set(character.id, character);
    newRaid.tokens = newRaid.tokens.set(token, newRaid.tokens.get(token) + 1);

    let updatedRaids = {};
    updatedRaids[currentRaid.id.toString()] = currentRaid;
    updatedRaids[newRaid.id.toString()] = newRaid;

    this.state.characters = this.state.characters.set(character.id, character);
    this.state.raids.merge(updatedRaids);
  }

  handleAddRaid() {
    let tokensMap = {};
    for(let token in tokens) {
      if(tokens.hasOwnProperty(token)) {
        tokensMap[tokens[token]] = 0;
      }
    }

    const raid = {
      id: this.nextRaidId++,
      characters: Immutable.OrderedMap(),
      tokens: Immutable.Map(tokensMap)
    };
    this.state.raids = this.state.raids.set(raid.id.toString(), raid);
  }

  handleDeleteRaid(raidId) {
    console.log('RaidId:', raidId);
    const raid = this.state.raids.get(raidId.toString());

    // Put characters back to raid0 on delete
    raid.characters.map(character => {
      console.log('Character:', character);
      console.log('CharacterId:', character.get('id'), character.id);
      this.handleMoveCharacter({
        characterId: character.get('id'),
        raidId: 0
      });
    });

    let raids = this.state.raids;
    raids = raids.delete(raidId.toString());

    this.state.raids = raids;
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
