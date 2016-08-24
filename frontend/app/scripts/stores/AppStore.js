import Immutable from 'immutable';
import alt from '../alt.jsx';
import AppActions from '../actions/AppActions';

class AppStore {

  constructor() {

    this.state = {};
    this.state.socket = null;

    this.bindListeners({
      onSocketConnect: AppActions.CONNECT_TO_SOCKET
    });
  }

  onSocketConnect(socket) {
    this.state.socket = socket;
  }

}

export default alt.createStore(AppStore, 'AppStore');
