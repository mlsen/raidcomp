(function () {
'use strict';

var RaidCompAction = require('../actions/raidComp').RaidCompAction;
var CharacterAction = require('../actions/character').CharacterAction;
var UserAction = require('../actions/user').UserAction;
var BulkAction = require('../actions/bulk').BulkAction;

var socketActions = {
  ADD_CHARACTER: 'addCharacter',
  MOVE_CHARACTER: 'moveCharacter',
  REMOVE_CHARACTER: 'removeCharacter',
  ADD_RAID: 'addRaid',
  REMOVE_RAID: 'removeRaid',
  REQUEST_NAMES: 'requestNames',
  SEND_NAME: 'sendName',
  REQUEST_BULK_DATA: 'requestBulkData'
};

var SocketHandler = {
  processMessage: function (data, socketResponse) {
    if (!data.action || !data.compId || !data.user || !socketResponse) return;
    data.shortCompId = data.compId.slice(0, 10);

    switch(data.action) {
      case socketActions.ADD_CHARACTER:
        CharacterAction.addCharacter(data, socketResponse);
      break;

      case socketActions.MOVE_CHARACTER:
        CharacterAction.moveCharacter(data, socketResponse);
      break;

      case socketActions.REMOVE_CHARACTER:
        CharacterAction.removeCharacter(data, socketResponse);
      break;

      case socketActions.ADD_RAID:
        RaidCompAction.addRaid(data, socketResponse);
      break;

      case socketActions.REMOVE_RAID:
        RaidCompAction.removeRaid(data, socketResponse);
      break;

      case socketActions.REQUEST_NAMES:
        UserAction.requestNames(data, socketResponse);
      break;

      case socketActions.SEND_NAME:
        UserAction.sendName(data, socketResponse);
      break;

      case socketActions.REQUEST_BULK_DATA:
        BulkAction.sendBulkData(data, socketResponse);
      break;
    }
  },

  throwError: function (data, msg, socketResponse) {
    socketResponse(data.shortCompId + ':' + data.user, { error: msg });
    return;
  }
};

module.exports = {
  socketActions: socketActions,
  SocketHandler: SocketHandler
};
}());
