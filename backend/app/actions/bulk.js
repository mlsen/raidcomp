(function () {
'use strict';

var RaidComp = require('../models/raidComp').RaidComp;
var Character = require('../models/character').Character;
var respondWithError = require('../misc/utils').respondWithError;

var BulkAction = {
  sendBulkData: function (data, socketResponse) {
    RaidComp
    .findOne({ _shortCompId: data.shortCompId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return respondWithError(data, 'There\'s no RaidComp with this Id.', socketResponse);
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
  }
};

module.exports = {
  BulkAction: BulkAction
};
}());
