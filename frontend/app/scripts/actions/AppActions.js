import alt from '../alt.jsx';
import io from 'socket.io-client';
import config from '../config.jsx';


class AppActions {

  connectToSocket() {
    console.log("connecting to socket");
    return io.connect(config.baseUrl);
  }

}

export default alt.createActions(AppActions);
