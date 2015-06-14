import alt from '../alt';
import Backend from '../misc/backendApi';
import AppStore from '../stores/AppStore';

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
}

export default alt.createActions(CompositionActions);
