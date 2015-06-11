import Immutable from 'immutable';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';
import RaidActions from '../actions/RaidActions';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName() {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for( var i=0; i < 8; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const classes = [
  'deathknight', 'druid', 'hunter', 'mage', 'monk', 'paladin',
  'priest', 'rogue', 'shaman', 'warlock', 'warrior'
];

function getRandomClass() {
  return classes[getRandomInt(0, classes.length)];
}

const Character = Immutable.Record({
  id: null,
  currentRaidId: null,
  name: null,
  class: null
});

class CharacterStore {

  constructor() {
    this.nextCharacterId = 1;
    this.nextRaidId = 1;

    this.state = {};
    this.state.characters = Immutable.OrderedMap();
    this.state.raids = Immutable.OrderedMap();

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
    if(!character.name) {
      character.name = getRandomName();
    }

    const id = this.nextCharacterId++;
    character = new Character({
      id: id,
      name: character.name,
      class: getRandomClass()
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
    const raidId = props.raidId;
    const oldRaidId = props.character.get('currentRaidId');
    let character = props.character;

    // Remove from old raid
    if(oldRaidId !== null) {
      let oldRaid = this.state.raids.get(oldRaidId.toString());
      oldRaid.characters = oldRaid.characters.delete(character.id.toString());
      this.state.raids = this.state.raids.set(oldRaidId.toString(), oldRaid);
    }

    // Add to new raid
    let raid = this.state.raids.get(raidId.toString());
    character = props.character.set('currentRaidId', raidId);
    raid.characters = raid.characters.set(character.id.toString(), character);

    this.state.raids = this.state.raids.set(raidId.toString(), raid);

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
