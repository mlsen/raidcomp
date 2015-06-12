'use strict';

var Raid = require('../models/raid');

var Actions = {
  processMessage: function (data, socketResponse) {
    console.log(data);
    if (!data.action && !data.compId && !data.user) return;

    switch(data.action) {
      case 'add':
        if (data.character) this.addCharacter(data, 0, socketResponse);
        break;
      case 'move':

        break;
      case 'remove':

        break;
      case 'name':

        break;
    }
  },
  addCharacter: function (data, raidId, socketResponse) {
    var character = data.character;
    if (!character.name || !character.realm || !character.region ||
      !character.className || !character.spec || !character.role) {

      socketResponse(data.compId + ':' + data.user, { error: 'Some character data was missing.' });
      return;
    }
    if (!raidId >= 0) {
      socketResponse(data.compId + ':' + data.user, { error: 'Bad raid id given.' });
      return;
    }

    Raid.findOne({ _compId: data.compId, id: raidId })
        .exec(function (err, raid) {
          if (err) return handleError(err);
          if (!raid) {
            socketResponse(data.compId + ':' + data.user, { error: 'Specified RaidComp not found.' });
            return;
          }

          for (var raidchar of raid.characters) {
            if (raidchar.name === character.name
              && raidchar.realm === character.realm
              && raidchar.region === character.region) {

              raidchar.className = character.className;
              raidchar.spec = character.spec;
              raidchar.role = character.role;

              raid.save(function (err) {
                if (err) return handleError(err);
                socketResponse(data.compId + ':' + data.user, { msg: 'update' });
              });
              return;
            }
          }

          // add a new character
          raid.characters.push({
            name: character.name,
            realm: character.realm,
            region: character.region,
            className: character.className,
            spec: character.spec,
            role: character.role
          });
          raid.save(function (err) {
            if (err) return handleError(err);
            socketResponse(data.compId, { msg: 'added' + character.name });
          });
          return;
    });
  }
}

module.exports = Actions;
