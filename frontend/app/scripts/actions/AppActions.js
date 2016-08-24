import alt from '../alt.jsx';
import io from 'socket.io-client';


class AppActions {

  connectToSocket() {
    console.log("connecting to socket");
    return io.connect('http://api.raidcomp.dev');
  }

}

export default alt.createActions(AppActions);
