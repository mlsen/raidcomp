'use strict';

var Raid = require('../models/raidcomp').Raid;
var Character = require('../models/raidcomp').Character;

var Actions = {
  processMessage: function (data, socketResponse) {
    if (!data.action || !data.compId || !data.user || !socketResponse) return;

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
        Actions.changeNumRaids(data, 1, socketResponse);
        break;
      case 'removeRaid':
        Actions.changeNumRaids(data, -1, socketResponse);
        break;
      case 'name':
        // user names
        break;
    }
  },

  addCharacter: function (data, socketResponse) {
    if (!data.character || !Actions.validateCharacter(data.character)) {
      if (socketResponse) socketResponse(data.compId + ':' + data.user, { error: 'Some character data was missing.' });
      return;
    }

    Raid
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err) return handleError(err);
      if (err || !raid) {
        return Actions.throwError(data, 'Specified RaidComp not found.', socketResponse);
      }

      var character = {
        _compId: data.compId,
        _raidId: 0,
        id: data.character.id,
        name: data.character.name,
        realm: data.character.realm,
        region: data.character.region,
        className: data.character.className,
        spec: data.character.spec,
        role: data.character.role
      }

      Character.findOneAndUpdate(
        { _compId: data.compId, _raidId: 0, id: data.character.id },
        character,
        { upsert: true, new: true },
        function (err, character) {
          if (socketResponse) {
            if (err || !character) {
              return Actions.throwError(data, 'Adding character failed. Maybe it had a reason..or not?', socketResponse);
            }
            socketResponse(data.compId, { action: data.action, user: data.user, character: character });
            return;
          }
        }
      );
    });
  },

  moveCharacter: function (data, socketResponse) {
    if (!data.character || !data.character.id || !data.to)
      return Actions.throwError(data, 'Required data for moving a character was missing.', socketResponse);

    Raid
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid || raid.numRaids < data.to) {
        return Actions.throwError(data, 'Target raid does not exist.', socketResponse);
      }

      Character
      .findOneAndUpdate(
        { _compId: data.compId, id: data.character.id },
        { _raidId: data.to },
        { new: true },
        function (err, character) {
          if (socketResponse) {
            if (err || !character) {
              return Actions.throwError(data, 'Moving character failed, it might not exist or something went wrong.', socketResponse);
            }
            socketResponse(data.compId, { action: data.action, user: data.user, character: character });
            return;
          }
        }
      );
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
          socketResponse(data.compId, { action: data.action, user: data.user, character: character });
          return;
        }
      }
    )
  },

  changeNumRaids: function (data, num, socketResponse) {
    Raid
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return Actions.throwError(data, 'Specified RaidComp not found.', socketResponse);
      }

      if (num === -1 && raid.numRaids === 1) {
        return Actions.throwError(data, 'Cannot delete the only raid.', socketResponse);
      }
      raid.numRaids += num;
      raid.save()
      socketResponse(data.compId, { action: data.action, user: data.user, raid: raid });
      return;
    });
  },

  validateCharacter: function (character) {
    return character.id && character.name && character.realm && character.region
      && character.className && character.spec && character.role;
  },

  throwError: function (data, msg, socketResponse) {
    socketResponse(data.compId + ':' + data.user, { error: msg });
    return;
  }
}

module.exports = Actions;
