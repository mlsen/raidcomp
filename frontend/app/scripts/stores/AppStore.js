import Immutable from 'immutable';
import io from 'socket.io-client';
import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {

  constructor() {

    this.state = {};
    this.state.socket = null;

    this.bindListeners({
      handleConnect: AppActions.CONNECT
    });
  }

  handleConnect() {
    if(this.state.socket === null) {
      this.state.socket = io.connect('http://api.raidcomp.dev');
    }
  }

}

export default alt.createStore(AppStore, 'AppStore');
