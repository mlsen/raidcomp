(function () {
'use strict';

var RaidComp = require('../models/raidcomp').RaidComp;
var Character = require('../models/character').Character;
var respondWithError = require('../misc/utils').respondWithError;

var RaidCompAction = {
  addRaid: function (data, socketResponse) {
    if (!data.raidId)
      return respondWithError(data, 'Required data for adding a raid was missing.', socketResponse);

    RaidComp
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid || raid.raidIds.indexOf(data.raidId) > -1) {
        return respondWithError(data, 'Specified RaidComp not found.', socketResponse);
      }

      raid.raidIds.push(data.raidId);
      raid.save();
      socketResponse(data.shortCompId, { action: data.action, user: data.user, raid: data.raidId });
      return;
    });
  },

  removeRaid: function (data, socketResponse) {
    if (!data.raidId || data.raidId == '0')
      return respondWithError(data, 'Required data for adding a raid was missing.', socketResponse);

    RaidComp
    .findOne({ _compId: data.compId, raidIds: data.raidId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return respondWithError(data, 'Specified RaidComp or raid not found.', socketResponse);
      }

      Character
      .find({ _compId: data.compId, raidId: data.raidId })
      .exec(function (err, characters) {
        if (characters && characters.length) {
          for (var character of characters) {
            character.raidId = '0';
            character.save();

            // let the client handle the moving on remove raid
            // socketResponse(data.shortCompId, { action: 'moveCharacter', user: data.user, character: character });
          }
        }
      });

      raid.raidIds.splice(raid.raidIds.indexOf(data.raidId), 1);
      raid.save();

      socketResponse(data.shortCompId, { action: data.action, user: data.user, raidId: data.raidId });
      return;
    });
  },
};

module.exports = {
  RaidCompAction: RaidCompAction
};
}());
