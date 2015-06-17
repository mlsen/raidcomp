import Immutable from 'immutable';
import sha1 from 'sha1';
import alt from '../alt';
import CompositionActions from '../actions/CompositionActions';
import AppStore from './AppStore';
import { getTokenForClass, tokens } from '../misc/wow';
import { generateRandomCharacter } from '../misc/tools';
import actions from '../misc/socketActions';

const Character = Immutable.Record({
  id: null,
  raidId: '0',
  name: null,
  region: null,
  realm: null,
  className: null,
  spec: null,
  role: null,
  ilvl: null,
  legendaryStage: null
});

function createCharacterRecord(character) {
  return new Character({
    id: character.id,
    raidId: character.raidId,
    name: character.name,
    region: character.region,
    realm: character.realm,
    className: character.className,
    spec: character.spec,
    role: character.role,
    ilvl: character.ilvl || 0,
    legendaryStage: character.legendaryStage || 1
  });
}

class CompositionConsumerStore {

  constructor() {

    this.state = {

      compositionId: null,
      user: null,

      // All characters
      characters: Immutable.OrderedMap(),

      // Raids
      // Key '0' contains all characters that are not in a raid yet
      raids: Immutable.OrderedSet()
    };

    this.bindListeners({
      handleSetComposition: CompositionActions.SET_COMPOSITION
    });
  }

  handleSetComposition(props) {
    let { compositionId, user } = props;

    // kinda dirty, in case it triggers twice
    if(this.state.compositionId !== null) {
      return;
    }

    if(compositionId.length !== 40 && compositionId.length !== 10) {
      // Invalid compositionId
      return;
    }

    if(compositionId.length > 10) {
      compositionId = compositionId.slice(0, 10);
    }

    this.state.compositionId = compositionId;
    this.state.user = user;

    this.waitFor(AppStore);
    const socket = AppStore.getState().socket;

    // Channel for global messages
    socket.on(compositionId, data => {
      console.log('incoming:', data);
      this._handleMessages(data);
    });

    // Channel for messages addressing me
    socket.on(compositionId + ':' + user, data => {
      console.log('user incoming:', data);
      this._handleUserMessages(data);
    });

    socket.emit('raidcomp', {
      action: actions.REQUEST_BULK_DATA,
      user: user,
      compId: compositionId
    });
  }

  _handleMessages(data) {
    const { action, user } = data;
    switch(action) {
      case actions.ADD_CHARACTER:
        this.handleAddCharacter(data.character);
        break;
      case actions.UPDATE_CHARACTER:
        this.handleUpdateCharacter(data.character);
        break;
      case actions.MOVE_CHARACTER:
        this.handleMoveCharacter({
          characterId: data.character.id,
          raidId: data.character.raidId
        });
        break;
      case actions.REMOVE_CHARACTER:
        this.handleRemoveCharacter(data.character);
        break;
      case actions.ADD_RAID:
        this.handleAddRaid(data.raid);
        break;
      case actions.REMOVE_RAID:
        this.handleRemoveRaid(data.raidId);
        break;
      case actions.REQUEST_NAMES:
        this.handleRequestNames(data);
        break;
    }
  }

  _handleUserMessages(data) {
    const { action, user, error } = data;

    // not very clean..
    if(error && error.indexOf('no RaidComp with this Id') > -1) {
      this.setState({ compositionId: null, user: null });
      return;
    }

    switch(action) {
      case actions.REQUEST_BULK_DATA:
        this.handleImportBulkData(data.data);
        break;
    }
  }

  handleAddCharacter(character) {
    if(this.state.characters.has(character.id)) {
      return;
    }

    character.raidId = '0';
    character = createCharacterRecord(character);

    this.setState({
      characters: this.state.characters.set(character.id, character)
    });
  }

  handleUpdateCharacter(character) {
    console.log('update character:', character);
    // character = this.state.characters.get(character.id);
    // console.log('Ok, character found:', character.toObject());

    this.setState({
      characters: this.state.characters.set(character.id, createCharacterRecord(character))
    });
  }

  handleMoveCharacter(props) {
    // 1. Add to new raid
    // 2. Delete from current raid

    // raidId: ID of new raid
    const { characterId, raidId } = props;

    // Character info
    let character = this.state.characters.get(characterId);
    character = character.set('raidId', raidId);

    this.setState({
      characters: this.state.characters.set(character.id, character)
    });
  }

  handleRemoveCharacter(character) {
    // Delete from all characters
    this.setState({
      characters: this.state.characters.delete(character.id)
    });
  }

  handleAddRaid(raidId) {
    this.setState({
      raids: this.state.raids.add(raidId)
    });
  }

  handleRemoveRaid(raidId) {
    let characters = this.state.characters;
    characters = characters.map(character => {
      if(character.get('raidId') === raidId) {
        character = character.set('raidId', '0');
      }
      return character;
    });

    this.setState({
      characters: characters,
      raids: this.state.raids.delete(raidId)
    });
  }

  handleImportBulkData(data) {

    // add characters
    let characters = {};
    data.characters.map(character => {
      character = createCharacterRecord(character);
      characters[character.id] = character;
    });

    this.setState({
      characters: Immutable.Map(characters),
      raids: Immutable.Set(data.raidIds)
    });
  }

  handleRequestNames(data) {
    console.log('_requestNames:', data);
  }

}

export default alt.createStore(CompositionConsumerStore, 'CompositionConsumerStore');
