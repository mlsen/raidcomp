(function (){

var request = require('request');
var Character = require('../models/character').Character;
var respondWithError = require('../misc/utils').respondWithError;

var regions = {
  //cn: 'www.battlenet.com.cn',
  eu: 'eu.api.battle.net',
  kr: 'kr.api.battle.net',
  tw: 'tw.api.battle.net',
  us: 'us.api.battle.net'
};

var ArmoryImportAction = {
  _armoryRequest: function (data, requestUrl, socketResponse) {
    requestUrl = encodeURI(requestUrl);
    request.get(requestUrl, function (error, response, body) {
      if (error || response.statusCode != 200) {
        return respondWithError(data, 'Import failed.', socketResponse);
      }

      socketResponse(data.shortCompId + ':' + data.user, { action: data.action, user: data.user, response: body });
      return;
    });
  },

  importGuild: function (data, socketResponse) {
    if (!data.region || !data.realm || !data.guild || !regions.hasOwnProperty(data.region)) {
      return respondWithError(data, 'Required attributes were missing', socketResponse);
    }
    var requestUrl = 'https://' + regions[data.region] + '/wow/guild/' + data.realm + '/' + data.guild + '?fields=members';
    this._armoryRequest(data, requestUrl, socketResponse);
  },

  importCharacter: function (data, socketResponse) {
    if (!data.region || !data.realm || !data.character || !regions.hasOwnProperty(data.region)) {
      return respondWithError(data, 'Required attributes were missing', socketResponse);
    }
    var requestUrl = 'https://' + regions[data.region] + '/wow/character/' + data.realm + '/' + data.character + '?fields=achievements,items,audit';
    this._armoryRequest(data, requestUrl, socketResponse);
  },

  importRealms: function (data, socketResponse) {
    if (!data.region || !regions.hasOwnProperty(data.region)) {
      return respondWithError(data, 'Required attributes were missing', socketResponse);
    }
    var requestUrl = 'https://' + regions[data.region] + '/wow/realm/status';
    this._armoryRequest(data, requestUrl, socketResponse);
  }
};

module.exports = {
  ArmoryImportAction: ArmoryImportAction
};
}());
