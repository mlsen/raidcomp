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
  url = 'http://' + region + '/api/wow/' + url;

  return request({
    url: url,
    type: 'jsonp',
    jsonpCallback: 'jsonp',
    crossOrigin: true,
    withCredentials: true
  })
  .then(response => {
    return response;
  })
  .fail(err => {
    console.log(err);
    return err;
  });
};

api.fetchGuild = function(region, realm, name) {
  return api.request(region,  'guild/' + realm + '/' + name + '?fields=members');
};

export default api;
