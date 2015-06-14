(function () {
'use strict';

var Raid = require('../models/raidcomp').Raid;
var Character = require('../models/raidcomp').Character;

var Actions = {
  processMessage: function (data, socketResponse) {
    if (!data.action || !data.compId || !data.user || !socketResponse) return;
    data.shortId = data.compId.slice(0, 10);

    switch(data.action) {
      case 'addCharacter':
        Actions.addCharacter(data, socketResponse);
      break;
      case 'moveCharacter':
        Actions.moveCharacter(data, socketResponse);
      break;
      case 'removeCharacter':
        Actions.removeCharacter(data, socketResponse);
      break;
      case 'addRaid':
        Actions.addRaid(data, socketResponse);
      break;
      case 'removeRaid':
        Actions.removeRaid(data, socketResponse);
      break;
      case 'requestNames':
        Actions.requestNames(data, socketResponse);
      break;
      case 'sendName':
        Actions.sendName(data, socketResponse);
      break;
    }
  },

  addCharacter: function (data, socketResponse) {
    if (!data.character || !Actions.validateCharacter(data.character)) {
      return Actions.throwError(data, 'Required data for creating a character was missing.', socketResponse);
    }

    Raid
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return Actions.throwError(data, 'Specified RaidComp not found.', socketResponse);
      }

      Character
      .findOne({ _compId: data.compId, id: data.character.id })
      .exec(function (err, character) {
        if (err) {
          //handle error
          return;
        }

        var newCharacter = {
          name: data.character.name,
          realm: data.character.realm,
          region: data.character.region,
          className: data.character.className,
          spec: data.character.spec,
          role: data.character.role
        };

        if (!character) {
          newCharacter._compId = data.compId;
          newCharacter.raidId = '0';
          newCharacter.id = data.character.id;

          Character.create(newCharacter, function (err, character) {
            if (err || !character)
              Actions.throwError(data, 'Failed to create new character.', socketResponse);

            socketResponse(data.shortId, { action: data.action, user: data.user, character: character});
            return;
          });
        } else {
          Character.update(
            { _compId: data.compId, id: data.character.id },
            newCharacter,
            function (err, character) {
              if (err || !character)
                Actions.throwError(data, 'Failed to update character.', socketResponse);

              socketResponse(data.shortId, { action: 'updateCharacter', user: data.user, character: character});
              return;
            }
          );
        }
      });
    });
  },

  moveCharacter: function (data, socketResponse) {
    if (!data.character || !data.character.id || !data.to)
      return Actions.throwError(data, 'Required data for moving a character was missing.', socketResponse);

    Raid
    .findOne({ _compId: data.compId, raidIds: data.to })
    .exec(function (err, raid) {
      if (err || !raid) {
        return Actions.throwError(data, 'Target raid does not exist.', socketResponse);
      }

      Character
      .findOne({ _compId: data.compId, id: data.character.id })
      .exec(function (err, character) {
        if (socketResponse) {
          if (err || !character || character.raidId == data.to) {
            return Actions.throwError(data, 'Moving character failed - it might not exist, was already in the same raid or something went wrong.', socketResponse);
          }

          character.raidId = data.to;
          character.save();
          socketResponse(data.shortId, { action: data.action, user: data.user, character: character });
          return;
        }
      });
    });
  },

  removeCharacter: function (data, socketResponse) {
    if (!data.character || !data.character.id)
      return Actions.throwError(data, 'Required data for removing a character was missing.', socketResponse);

    Character.findOneAndRemove(
      { _compId: data.compId, id: data.character.id },
      function (err, character) {
        if (socketResponse) {
          if (err || !character) {
            return Actions.throwError(data, 'Removing character failed.', socketResponse);
          }
          socketResponse(data.shortId, { action: data.action, user: data.user, character: character });
          return;
        }
      }
    );
  },

  addRaid: function (data, socketResponse) {
    if (!data.raidId)
      return Actions.throwError(data, 'Required data for adding a raid was missing.', socketResponse);

    Raid
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid || raid.raidIds.indexOf(data.raidId) > -1) {
        return Actions.throwError(data, 'Specified RaidComp not found.', socketResponse);
      }

      raid.raidIds.push(data.raidId);
      raid.save();
      socketResponse(data.shortId, { action: data.action, user: data.user, raid: data.raidId });
      return;
    });
  },

  removeRaid: function (data, socketResponse) {
    if (!data.raidId || data.raidId == '0')
      return Actions.throwError(data, 'Required data for adding a raid was missing.', socketResponse);

    Raid
    .findOne({ _compId: data.compId, raidIds: data.raidId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return Actions.throwError(data, 'Specified RaidComp or raid not found.', socketResponse);
      }

      Character
      .find({ _compId: data.compId, raidId: data.raidId })
      .exec(function (err, characters) {
        if (characters && characters.length) {
          for (var character of characters) {
            character.raidId = 0;
            character.save();

            socketResponse(data.shortId, { action: 'moveCharacter', user: data.user, character: character });
          }
        }
      });

      raid.raidIds.splice(raid.raidIds.indexOf(data.raidId), 1);
      raid.save();

      socketResponse(data.shortId, { action: data.action, user: data.user, raidId: data.raidId });
      return;
    });
  },

  requestNames: function (data, socketResponse) {
    socketResponse(data.shortId, { action: 'requestNames', user: data.user, requestFrom: data.user });
    return;
  },

  sendName: function (data, socketResponse) {
    if (!data.name) {
      return Actions.throwError(data, 'No name given.', socketResponse);
    }
    var socket = data.requestFrom ? data.shortId + ':' + data.requestFrom : data.shortId;
    socketResponse(socket, { action: 'sendName', user: data.user, name: data.name });
    return;
  },

  validateCharacter: function (character) {
    return character.id && character.name && character.realm && character.region &&
      character.className && character.spec && character.role;
  },

  throwError: function (data, msg, socketResponse) {
    socketResponse(data.shortId + ':' + data.user, { error: msg });
    return;
  }
};

module.exports = Actions;
}());
