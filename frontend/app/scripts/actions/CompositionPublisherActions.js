import alt from '../alt';
import Backend from '../misc/backendApi';
import AppStore from '../stores/AppStore';

class CompositionPublisherActions {

  addCharacter(character) {
    this.dispatch(character);
  }

  removeCharacter(characterId) {
    this.dispatch(characterId);
  }

  moveCharacter(characterId, raidId) {
    this.dispatch({
      characterId: characterId,
      raidId: raidId
    });
  }

  addRaid() {
    this.dispatch();
  }

  removeRaid(raidId) {
    this.dispatch(raidId);
  }

  importCharacters() {
    this.dispatch();
  }
}

export default alt.createActions(CompositionPublisherActions);
