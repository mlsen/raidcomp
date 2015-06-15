import request from 'reqwest';

const baseUrl = 'http://api.raidcomp.mlsn.me';
const api = {};

api.createComposition = function() {
  return request({
    url: baseUrl + '/comp',
    method: 'post'
  });
};

export default api;
