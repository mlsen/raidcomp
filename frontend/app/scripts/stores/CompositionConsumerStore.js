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
      this._handleSocket(data);
    });

    this.setState({
      compositionId: compositionId
    });
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
    const { characterId, raidId } = props;
    console.log('moveCharacter:', characterId, raidId);

    let character = this.state.characters.get(characterId);

    const token = getTokenForClass(character.className);

    // Delete from current raid
    let currentRaid = this.state.raids.get(character.currentRaidId);
    currentRaid.characters = currentRaid.characters.delete(character.id);
    currentRaid.tokens = currentRaid.tokens.set(token, currentRaid.tokens.get(token) - 1);

    // Add to new raid
    let newRaid = this.state.raids.get(raidId);
    character = character.set('currentRaidId', newRaid.id);
    newRaid.characters = newRaid.characters.set(character.id, character);
    newRaid.tokens = newRaid.tokens.set(token, newRaid.tokens.get(token) + 1);

    this.setState({
      characters: this.state.characters.set(character.id, character)
    });
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