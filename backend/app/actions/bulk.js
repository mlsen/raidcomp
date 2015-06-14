(function () {
'use strict';

var SocketHandler = require('../handlers/socket').SocketHandler;
var RaidComp = require('../models/raidcomp').RaidComp;
var Character = require('../models/character').Character;

var BulkAction = {
  sendBulkData: function (data, socketResponse) {
    RaidComp
    .findOne({ _shortCompId: data.shortCompId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return SocketHandler.throwError(data, 'There\'s no RaidComp with this Id.', socketResponse);
      }

      Character
      .find({ _compId: raid._compId })
      .exec(function (err, characters) {
        var response = {
          raidIds: raid.raidIds,
          characters: characters
        };
        socketResponse(data.shortCompId + ':' + data.user, { action: data.action, user: data.user, data: response });
        return;
      });
    });
  },
};

module.exports = {
  BulkAction: BulkAction
};
}());
