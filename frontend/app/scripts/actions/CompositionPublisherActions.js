import alt from '../alt.jsx';

class CompositionPublisherActions {

  addCharacter(character) {
    return character;
  }

  updateCharacter(character) {
    return character;
  }

  removeCharacter(characterId) {
    return characterId;
  }

  moveCharacter(characterId, raidId) {
    return {
      characterId: characterId,
      raidId: raidId
    };
  }

  addRaid() {
    return;
  }

  removeRaid(raidId) {
    return raidId;
  }

  importStaging() {
    return;
  }
}

export default alt.createActions(CompositionPublisherActions);
