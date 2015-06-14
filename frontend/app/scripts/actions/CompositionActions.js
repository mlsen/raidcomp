import sha1 from 'sha1';
import alt from '../alt';
import Backend from '../misc/backendApi';
import AppStore from '../stores/AppStore';

function generateRandomId() {
  return sha1(Math.random());
}

class CompositionActions {

  createComposition() {
    Backend.createComposition()
      .then(response => {
        this.actions.setComposition(response.compId);
      })
      .fail(err => {
        this.actions.createCompositionFailed(err);
      });
  }

  setComposition(id) {
    this.dispatch({
      compositionId: id,
      user: generateRandomId()
    });
  }

  createCompositionFailed(err) {
    this.dispatch(err);
  }
}

export default alt.createActions(CompositionActions);
