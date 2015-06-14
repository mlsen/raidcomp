import Immutable from 'immutable';
import sha1 from 'sha1';
import alt from '../alt';
import CompositionActions from '../actions/CompositionActions';
import ImportStore from './ImportStore';
import AppStore from './AppStore';
import { getTokenForClass, tokens } from '../misc/wow';
import { generateRandomCharacter } from '../misc/tools';

const actions = {
  ADD_CHARACTER: 'addCharacter',
  MOVE_CHARACTER: 'moveCharacter',
  REMOVE_CHARACTER: 'removeCharacter',
  REQUEST_NAMES: 'requestNames',
  ADD_RAID: 'addRaid',
  REMOVE_RAID: 'removeRaid'
};

const Character = Immutable.Record({
  id: null,
  currentRaidId: 0,
  name: null,
  region: null,
  realm: null,
  className: null,
  spec: null,
  role: null
});

function isValidCharacter(character) {
  return (
    character.id &&
    character.name &&
    character.className &&
    character.region &&
    character.realm
  );
}

function generateRaidId() {
  return sha1(Math.random().toString(36).slice(2));
}

function generateCharacterId(character) {
  return sha1(
    character.region.toLowerCase() +
    character.realm.toLowerCase() +
    character.name.toLowerCase()
  );
}

class CompositionStore {

  constructor() {

    this.state = {

      shortCompositionId: null,
      longCompositionId: null,

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
      handleCreateComposition: CompositionActions.CREATE_COMPOSITION,
      handleCreateCompositionFailed: CompositionActions.CREATE_COMPOSITION_FAILED,
      handleSetComposition: CompositionActions.SET_COMPOSITION,

      handleAddCharacter: CompositionActions.ADD_CHARACTER,
      handleDeleteCharacter: CompositionActions.DELETE_CHARACTER,
      handleMoveCharacter: CompositionActions.MOVE_CHARACTER,
      handleImportCharacters: CompositionActions.IMPORT,

      handleAddRaid: CompositionActions.ADD_RAID,
      handleDeleteRaid: CompositionActions.DELETE_RAID
    });
  }

  handleCreateComposition() {

  }

  handleCreateCompositionFailed(err) {
    console.log(err);
  }

  handleSetComposition(compositionId) {
    if(compositionId.length !== 32 && compositionId.length !== 10) {
      // Invalid compositionId
      return;
    }

    let longCompositionId, shortCompositionId;
    if(compositionId.length === 32) {
      longCompositionId = compositionId;
      shortCompositionId = longCompositionId.slice(0, 10);
    } else {
      longCompositionId = null;
      shortCompositionId = compositionId;
    }

    this.waitFor(AppStore);
    AppStore.getState().socket.on(shortCompositionId, data => {
      this.handleSocketMessage(data);
    });

    this.setState({
      longCompositionId: longCompositionId,
      shortCompositionId: shortCompositionId
    });
  }

  handleSocketMessage(data) {
    const { action, user } = data;
    switch(action) {
      case actions.ADD_CHARACTER:
        this._addCharacter(data.character);
        break;
      case actions.MOVE_CHARACTER:
        this._moveCharacter(data.character);
        break;
      case actions.REMOVE_CHARACTER:
        this._removeCharacter(data.character);
        break;
      case actions.ADD_RAID:
        this._addRaid(data.raid);
        break;
      case actions.REMOVE_RAID:
        this._removeRaid(data);
        break;
      case actions.REQUEST_NAMES:
        this._requestNames(data);
        break;
    }
  }

  _addCharacter(character) {
    console.log('_addCharacter:', character);
    if(!character || !isValidCharacter(character)) {
      // Probably needs some error handling at this point
      return;
    }

    if(this.state.characters.has(character.id)) {
      return;
    }
    character = new Character({
      id: character.id,
      currentRaidId: 0,
      name: character.name,
      region: character.region,
      realm: character.realm,
      className: character.className,
      spec: character.spec,
      role: character.role
    });

    // Add to raid '0'
    let raid = this.state.raids.get('0');
    raid.characters = raid.characters.set(character.id, character);

    this.setState({
      characters: this.state.characters.set(character.id, character),
      raids: this.state.raids.set('0', raid)
    });
  }

  _moveCharacter(character) {
    console.log('_moveCharacter:', character);

    const characterId = character.id;
    const raidId = character.raidId;

    character = this.state.characters.get(characterId);

    const token = getTokenForClass(character.className);

    // Delete from current raid
    console.log(character.get('currentRaidId'), character.currentRaidId);
    let currentRaid = this.state.raids.get(character.currentRaidId);
    currentRaid.characters = currentRaid.characters.delete(character.id);
    currentRaid.tokens = currentRaid.tokens.set(token, currentRaid.tokens.get(token) - 1);

    // Add to new raid
    let newRaid = this.state.raids.get(raidId.toString());
    character = character.set('currentRaidId', newRaid.id);
    newRaid.characters = newRaid.characters.set(character.id, character);
    newRaid.tokens = newRaid.tokens.set(token, newRaid.tokens.get(token) + 1);

    let updatedRaids = {};
    updatedRaids[currentRaid.id] = currentRaid;
    updatedRaids[newRaid.id] = newRaid;

    this.setState({
      characters: this.state.characters.set(character.id, character),
      raids: this.state.raids.merge(updatedRaids)
    });
  }

  _removeCharacter(character) {
    console.log('_removeCharacter:', character);

    character = this.state.characters.get(character.id);

    // Delete from all characters
    this.state.characters = this.state.characters.delete(characterId);

    // Delete from current raid
    let raid = this.state.raids.get(character.currentRaidId.toString());
    raid.characters = raid.characters.delete(character.id);
    this.state.raids = this.state.raids.set(raid.id.toString(), raid);
  }

  _addRaid(raid) {
    console.log('_addRaid:', raid);

    let tokensMap = {};
    for(let token in tokens) {
      if(tokens.hasOwnProperty(token)) {
        tokensMap[tokens[token]] = 0;
      }
    }

    const raidId = raid.raidIds.pop();
    console.log('RaidId:', raidId);

    raid = {
      id: raidId,
      characters: Immutable.OrderedMap(),
      tokens: Immutable.Map(tokensMap)
    };

    this.setState({
      raids: this.state.raids.set(raid.id, raid)
    });
  }

  _removeRaid(data) {
    console.log('_removeRaid:', data);
  }

  _requestNames(data) {
    console.log('_requestNames:', data);
  }

  handleAddCharacter(character) {
    console.log(character);
    character.id = generateCharacterId(character);
    character.spec = character.spec || 'unknown';
    character.role = character.role || 'unknown';

    AppStore.getState().socket.emit('raidcomp', {
      action: actions.ADD_CHARACTER,
      user: 'user',
      compId: this.state.longCompositionId,
      character: character
    });
  }

  handleDeleteCharacter(characterId) {

  }

  handleMoveCharacter(props) {
    const { characterId, raidId } = props;
    AppStore.getState().socket.emit('raidcomp', {
      action: actions.MOVE_CHARACTER,
      user: 'user',
      compId: this.state.longCompositionId,
      to: raidId,
      character: {
        id: characterId
      }
    });
  }

  handleAddRaid() {
    AppStore.getState().socket.emit('raidcomp', {
      action: actions.ADD_RAID,
      user: 'user',
      compId: this.state.longCompositionId,
      raidId: generateRaidId()
    });
  }

  handleDeleteRaid(raidId) {
    const raid = this.state.raids.get(raidId.toString());

    // Put characters back to raid0 on delete
    raid.characters.map(character => {
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

export default alt.createStore(CompositionStore, 'CompositionStore');
