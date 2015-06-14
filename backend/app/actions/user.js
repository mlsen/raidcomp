(function () {
'use strict';

var respondWithError = require('../misc/utils').respondWithError;

var UserAction = {
  requestNames: function (data, socketResponse) {
    socketResponse(data.shortCompId, { action: 'requestNames', user: data.user, requestFrom: data.user });
    return;
  },

  sendName: function (data, socketResponse) {
    if (!data.name) {
      return respondWithError(data, 'No name given.', socketResponse);
    }
    var socket = data.requestFrom ? data.shortCompId + ':' + data.requestFrom : data.shortCompId;
    socketResponse(socket, { action: 'sendName', user: data.user, name: data.name });
    return;
  }
};

module.exports = {
  UserAction: UserAction
};
}());
