(function () {
'use strict';

var RaidComp = require('../models/raidComp').RaidComp;
var Character = require('../models/character').Character;
var respondWithError = require('../misc/utils').respondWithError;

var CharacterAction = {
  addCharacter: function (data, socketResponse) {
    if (!data.character || !CharacterAction.validateCharacter(data.character)) {
      return respondWithError(data, 'Required data for creating a character was missing.', socketResponse);
    }

    RaidComp
    .findOne({ _compId: data.compId })
    .exec(function (err, raid) {
      if (err || !raid) {
        return respondWithError(data, 'Specified RaidComp not found.', socketResponse);
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
          role: data.character.role,
          number: data.character.ilvl,
          legendaryStage: data.character.legendaryStage
        };

        if (!character) {
          newCharacter._compId = data.compId;
          newCharacter.raidId = '0';
          newCharacter.id = data.character.id;

          Character.create(newCharacter, function (err, character) {
            if (err || !character)
              respondWithError(data, 'Failed to create new character.', socketResponse);

            socketResponse(data.shortCompId, { action: data.action, user: data.user, character: character});
            return;
          });
        } else {
          Character.update(
            { _compId: data.compId, id: data.character.id },
            newCharacter,
            function (err, character) {
              if (err || !character)
                respondWithError(data, 'Failed to update character.', socketResponse);

              socketResponse(data.shortCompId, { action: 'updateCharacter', user: data.user, character: character});
              return;
            }
          );
        }
      });
    });
  },

  moveCharacter: function (data, socketResponse) {
    if (!data.character || !data.character.id || !data.to)
      return respondWithError(data, 'Required data for moving a character was missing.', socketResponse);

    RaidComp
    .findOne({ _compId: data.compId, raidIds: data.to })
    .exec(function (err, raid) {
      if (err || !raid) {
        return respondWithError(data, 'Target raid does not exist.', socketResponse);
      }

      Character
      .findOne({ _compId: data.compId, id: data.character.id })
      .exec(function (err, character) {
        if (socketResponse) {
          if (err || !character || character.raidId == data.to) {
            return respondWithError(data, 'Moving character failed - it might not exist, was already in the same raid or something went wrong.', socketResponse);
          }

          character.raidId = data.to;
          character.save();
          socketResponse(data.shortCompId, { action: data.action, user: data.user, character: character });
          return;
        }
      });
    });
  },

  removeCharacter: function (data, socketResponse) {
    if (!data.character || !data.character.id)
      return respondWithError(data, 'Required data for removing a character was missing.', socketResponse);

    Character.findOneAndRemove(
      { _compId: data.compId, id: data.character.id },
      function (err, character) {
        if (socketResponse) {
          if (err || !character) {
            return respondWithError(data, 'Removing character failed.', socketResponse);
          }
          socketResponse(data.shortCompId, { action: data.action, user: data.user, character: character });
          return;
        }
      }
    );
  },

  validateCharacter: function (character) {
    return character.id && character.name && character.realm && character.region &&
      character.className && character.role;
  }
};

module.exports = {
  CharacterAction: CharacterAction
};
}());
