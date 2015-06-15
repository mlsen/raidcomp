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
  REMOVE_RAID: 'removeRaid',
  REQUEST_BULK_DATA: 'requestBulkData'
};

class CompositionPublisherStore {

  constructor() {
    this.bindListeners({
      handleSetComposition: CompositionActions.SET_COMPOSITION,
      handleCreateCompositionFailed: CompositionActions.CREATE_COMPOSITION_FAILED,

      handleAddCharacter: CompositionPublisherActions.ADD_CHARACTER,
      handleMoveCharacter: CompositionPublisherActions.MOVE_CHARACTER,
      handleRemoveCharacter: CompositionPublisherActions.REMOVE_CHARACTER,

      handleAddRaid: CompositionPublisherActions.ADD_RAID,
      handleRemoveRaid: CompositionPublisherActions.REMOVE_RAID,

      handleImportCharacters: CompositionPublisherActions.IMPORT_CHARACTERS
    });

    this.state = {};
    this.state.compositionId = null;
    this.state.user = null;
  }

  _emit(payload) {
    payload.compId = payload.compId || this.state.compositionId;
    payload.user = payload.user || this.state.user;
    AppStore.getState().socket.emit('raidcomp', payload);
  }

  handleSetComposition(props) {

    const { compositionId, user } = props;

    // in case it triggers twice
    if(this.state.compositionId !== null) {
      return;
    }

    if(compositionId.length !== 40) {
      return;
    }

    this.setState({
      compositionId: compositionId,
      user: user
    });
  }

  handleCreateCompositionFailed(err) {
    console.log('Error creating composition:', err);
  }

  handleAddCharacter(character) {
    character.id = generateCharacterId(character);
    character.spec = character.spec || 'unknown';
    character.role = character.role || 'unknown';

    this._emit({
      action: actions.ADD_CHARACTER,
      character: character
    });
  }

  handleMoveCharacter(props) {
    const { characterId, raidId } = props;
    this._emit({
      action: actions.MOVE_CHARACTER,
      to: raidId,
      character: {
        id: characterId
      }
    });
  }

  handleRemoveCharacter(characterId) {
    this._emit({
      action: actions.REMOVE_CHARACTER,
      character: {
        id: characterId
      }
    });
  }

  handleAddRaid() {
    this._emit({
      action: actions.ADD_RAID,
      raidId: generateRaidId()
    });
  }

  handleRemoveRaid(raidId) {
    this._emit({
      action: actions.REMOVE_RAID,
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
  return sha1(Math.random());
}

function generateCharacterId(character) {
  return sha1(
    character.region.toLowerCase() +
    character.realm.toLowerCase() +
    character.name.toLowerCase()
  );
}

export default alt.createStore(CompositionPublisherStore, 'CompositionPublisherStore');
