(function () {
'use strict';

var respondWithError = function (data, msg, socketResponse) {
  socketResponse(data.shortCompId + ':' + data.user, { error: msg });
  return;
};

module.exports = {
  respondWithError: respondWithError
};
}());
