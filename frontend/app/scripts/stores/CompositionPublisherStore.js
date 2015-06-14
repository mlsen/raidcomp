import Immutable from 'immutable';
import sha1 from 'sha1';
import alt from '../alt';
import CompositionActions from '../actions/CompositionActions';
import CompositionPublisherActions from '../actions/CompositionPublisherActions';
import AppStore from './AppStore';
import ImportStore from './ImportStore';

const actions = {
  ADD_CHARACTER: 'addCharacter',
  MOVE_CHARACTER: 'moveCharacter',
  REMOVE_CHARACTER: 'removeCharacter',
  REQUEST_NAMES: 'requestNames',
  ADD_RAID: 'addRaid',
  REMOVE_RAID: 'removeRaid'
};

class CompositionPublisherStore {

  constructor() {
    this.bindListeners({
      handleSetComposition: CompositionActions.SET_COMPOSITION,

      handleAddCharacter: CompositionPublisherActions.ADD_CHARACTER,
      handleMoveCharacter: CompositionPublisherActions.MOVE_CHARACTER,
      handleRemoveCharacter: CompositionPublisherActions.REMOVE_CHARACTER,

      handleAddRaid: CompositionPublisherActions.ADD_RAID,
      handleRemoveRaid: CompositionPublisherActions.REMOVE_RAID,

      handleImportCharacters: CompositionPublisherActions.IMPORT_CHARACTERS
    });

    this.state = {};
    this.state.compositionId = null;
  }

  _emit(payload) {
    payload.compId = payload.compId || this.state.compositionId;
    AppStore.getState().socket.emit('raidcomp', payload);
  }

  handleSetComposition(compositionId) {
    if(compositionId.length !== 32) {
      return;
    }
    this.setState({ compositionId: compositionId });
  }

  handleAddCharacter(character) {
    character.id = generateCharacterId(character);
    character.spec = character.spec || 'unknown';
    character.role = character.role || 'unknown';

    this._emit({
      action: actions.ADD_CHARACTER,
      user: 'user',
      character: character
    });
  }

  handleMoveCharacter(props) {
    const { characterId, raidId } = props;
    this._emit({
      action: actions.MOVE_CHARACTER,
      user: 'user',
      to: raidId,
      character: {
        id: characterId
      }
    });
  }

  handleRemoveCharacter(characterId) {
    this._emit({
      action: actions.REMOVE_CHARACTER,
      user: 'user',
      character: {
        id: characterId
      }
    });
  }

  handleAddRaid() {
    this._emit({
      action: actions.ADD_RAID,
      user: 'user',
      raidId: generateRaidId()
    });
  }

  handleRemoveRaid(raidId) {
    this._emit({
      action: actions.REMOVE_RAID,
      user: 'user',
      raidId: raidId
    });
  }

  handleImportCharacters() {
    this.waitFor(ImportStore);
    const importCharacters = ImportStore.getState().importCharacters;

    importCharacters.map(character => {
      this.handleAddCharacter(character.toObject());
    });
  }
}


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

export default alt.createStore(CompositionPublisherStore, 'CompositionPublisherStore');
