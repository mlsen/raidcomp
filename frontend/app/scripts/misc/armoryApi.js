import request from 'reqwest';

const regions = {
  cn: 'www.battlenet.com.cn',
  eu: 'eu.battle.net',
  kr: 'kr.battle.net',
  tw: 'tw.battle.net',
  us: 'us.battle.net'
};

const api = {};

api.request = function(region, url) {
  region = regions.hasOwnProperty(region) ? regions[region] : regions['eu'];
  url = encodeURI('http://' + region + '/api/wow/' + url.toLowerCase());

  return request({
    url: url,
    type: 'jsonp',
    jsonpCallback: 'jsonp'
  })
  .then(response => {
    return response;
  });
};

api.fetchGuild = function(region, realm, guild) {
  return api.request(region,  'guild/' + realm + '/' + guild + '?fields=members');
};

api.fetchRealms = function(region) {
  return api.request(region, 'realm/status');
};

export default api;
