import config from '../config.jsx';

const baseUrl = config.baseUrl;
const api = {};

api.createComposition = function() {
  return fetch(baseUrl + '/comp', {
    method: 'post'
  }).then(response => {
    return response.json();
  });
};

api.armoryRequest = function(region, url, params) {
  let requrl = baseUrl + '/armory/' + region + url;
  return fetch(requrl)
    .then(response => {
      return response.json();
    });
};

api.fetchRealms = function(region) {
  return api.armoryRequest(region, '/realm/status', '');
};

api.fetchGuild = function(region, realm, guild) {
  return api.armoryRequest(region, '/guild/' + realm + '/' + guild + '?fields=members');
};

api.fetchCharacter = function(region, realm, character) {
  return api.armoryRequest(region, '/character/' + realm + '/' + character + '?fields=items');
};

export default api;
