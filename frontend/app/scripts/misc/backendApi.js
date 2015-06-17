const baseUrl = 'http://api.raidcomp.mlsn.me';
const api = {};

api.createComposition = function() {
  return fetch(baseUrl + '/comp', {
    method: 'post'
  }).then(response => {
    return response.json();
  });
};

api.armoryRequest = function(region, url) {
  return fetch(baseUrl + '/armory/' + region + url)
    .then(response => {
      return response.json();
    });
};

api.fetchRealms = function(region) {
  return api.armoryRequest(region, '/realm/status');
};

api.fetchGuild = function(region, realm, guild) {
  return api.armoryRequest(region, '/guild/' + realm + '/' + guild + '?fields=members');
};

api.fetchCharacter = function(region, realm, character) {
  return api.armoryRequest(region, '/character/' + realm + '/' + character + '?fields=items');
};

export default api;
