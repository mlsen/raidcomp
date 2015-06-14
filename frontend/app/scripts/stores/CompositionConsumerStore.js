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
  currentRaidId: '0',
  name: null,
  region: null,
  realm: null,
  className: null,
  spec: null,
  role: null
});

class CompositionConsumerStore {

  constructor() {

    this.state = {

      compositionId: null,

      // All characters
      characters: Immutable.OrderedMap(),

      // Raids
      // Key '0' contains all characters that are not in a raid yet
      raids: Immutable.OrderedMap({
        '0': {
          id: '0',
          characters: Immutable.OrderedMap(),
          tokens: Immutable.Map()
        }
      })
    };

    this.bindListeners({
      handleSetComposition: CompositionActions.SET_COMPOSITION,
    });
  }

  handleSetComposition(compositionId) {
    if(compositionId.length !== 32 && compositionId.length !== 10) {
      // Invalid compositionId
      return;
    }

    if(compositionId.length > 10) {
      compositionId = compositionId.slice(0, 10);
    }

    this.waitFor(AppStore);
    AppStore.getState().socket.on(compositionId, data => {
      console.log('incoming:', data);
      this._handleSocket(data);
    });

    // this.setState({
    //   compositionId: compositionId
    // });
  }

  _handleSocket(data) {
    const { action, user } = data;
    switch(action) {
      case actions.ADD_CHARACTER:
        this.handleAddCharacter(data.character);
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
        console.log('remove raid olol');
        this.handleRemoveRaid(data.raidId);
        break;
      case actions.REQUEST_NAMES:
        this.handleRequestNames(data);
        break;
    }
  }

  handleAddCharacter(character) {
    if(this.state.characters.has(character.id)) {
      return;
    }
    character = new Character({
      id: character.id,
      currentRaidId: '0',
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

  handleMoveCharacter(props) {
    // 1. Add to new raid
    // 2. Delete from current raid

    // raidId: ID of new raid
    const { characterId, raidId } = props;

    // Character info
    let character = this.state.characters.get(characterId);
    const currentRaidId = character.currentRaidId;
    const characterToken = getTokenForClass(character.className);

    // Add to new raid
    let newRaid = this.state.raids.get(raidId);
    newRaid.characters = newRaid.characters.set(characterId, character);
    newRaid.tokens = newRaid.tokens.set(characterToken, newRaid.tokens.get(characterToken) + 1);

    // Delete from old raid
    let currentRaid = this.state.raids.get(currentRaidId);
    currentRaid.characters = currentRaid.characters.delete(characterId);
    currentRaid.tokens = currentRaid.tokens.set(characterToken, currentRaid.tokens.get(characterToken) - 1);

    // Change currentRaidId to raidId
    character = character.set('currentRaidId', raidId);

    this.state.raids = this.state.raids.set(raidId, newRaid);
    this.state.raids = this.state.raids.set(currentRaidId, currentRaid);
    this.state.characters = this.state.characters.set(characterId, character);

    this.emitChange();
  }

  handleRemoveCharacter(character) {
    character = this.state.characters.get(character.id);

    // Delete from all characters
    this.state.characters = this.state.characters.delete(character.id);

    // Delete from current raid
    let raid = this.state.raids.get(character.currentRaidId.toString());
    raid.characters = raid.characters.delete(character.id);

    this.setState({
      raids:this.state.raids.set(raid.id.toString(), raid)
    });
  }

  handleAddRaid(raidId) {
    let tokensMap = {};
    for(let token in tokens) {
      if(tokens.hasOwnProperty(token)) {
        tokensMap[tokens[token]] = 0;
      }
    }

    const raid = {
      id: raidId,
      characters: Immutable.OrderedMap(),
      tokens: Immutable.Map(tokensMap)
    };

    this.setState({
      raids: this.state.raids.set(raidId, raid)
    });
  }

  handleRemoveRaid(raidId) {
    const raid = this.state.raids.get(raidId);

    console.log(raidId, this.state.raids.get(raidId));

    // Put characters back to raid0 on delete
    raid.characters.map(character => {
      this.handleMoveCharacter({
        characterId: character.get('id'),
        raidId: '0'
      });
    });

    this.setState({
      raids: this.state.raids.delete(raidId)
    });
  }

  handleRequestNames(data) {
    console.log('_requestNames:', data);
  }

}

export default alt.createStore(CompositionConsumerStore, 'CompositionConsumerStore');
