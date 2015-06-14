import alt from '../alt';
import Backend from '../misc/backendApi';

class CompositionActions {

  createComposition() {
    this.dispatch();

    Backend.createComposition()
      .then(response => {
        this.actions.setComposition(response.compId);
      })
      .fail(err => {
        this.actions.createCompositionFailed(err);
      });
  }

  setComposition(id) {
    this.dispatch(id);
  }

  createCompositionFailed(err) {
    this.dispatch(err);
  }

  addCharacter(character) {
    this.dispatch(character);
  }

  deleteCharacter(characterId) {
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

  deleteRaid(raidId) {
    this.dispatch(raidId);
  }

  import() {
    this.dispatch();
  }

}

export default alt.createActions(CompositionActions);
