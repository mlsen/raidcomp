import sha1 from 'sha1';
import alt from '../alt.jsx';
import Backend from '../misc/backendApi';
import AppStore from '../stores/AppStore';

function generateRandomId() {
  return sha1(Math.random());
}

class CompositionActions {

  createComposition() {
    Backend.createComposition()
      .then(response => {
        this.setComposition(response.compId)
      })
      .catch(err => {
        this.createCompositionFailed(err);
      });
      return false;
  }

  setComposition(id) {
    return (dispatch) => {
      dispatch({
        compositionId: id,
        user: generateRandomId()
      });
    }
  }

  createCompositionFailed(err) {
    return (dispatch) => {
      dispatch(err);
    }
  }
}

export default alt.createActions(CompositionActions);
