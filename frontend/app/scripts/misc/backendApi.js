import request from 'reqwest';

const baseUrl = 'http://api.raidcomp.dev';
const api = {};

api.createComposition = function() {
  return request({
    url: baseUrl + '/comp',
    method: 'post'
  });
};

export default api;
