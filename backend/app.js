(function () {
'use strict';

var app = require('express')();
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var config = require('./app/config');

// var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/raidcomp');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//  // do stuff
// });

//app.use(bodyparser.json());
app.use(cors());

var ApiRouter = require('./app/routes/api').ApiRouter;
app.use('/comp', ApiRouter);

// debug
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/client.html');
});

// Proxy route for armory requests
var regions = {
  // cn: 'www.battlenet.com.cn',
  eu: 'eu.api.battle.net',
  kr: 'kr.api.battle.net',
  tw: 'tw.api.battle.net',
  us: 'us.api.battle.net'
};

app.get(/armory\/([a-z]{2})\/(.+)/, function(req, res, next) {
  // req.params[0] = region shortform
  // req.url = full url

  if(!regions.hasOwnProperty(req.params[0])) {
    return res.status(400).json({ error: 'No such region.'} );
  }
  var reqUrl = 'https://' + regions[req.params[0]] + '/wow/';
  // 3 = length of region + /
  var removeChars = '/armory/'.length + 3;
  reqUrl = reqUrl.concat(req.url.substring(removeChars));

  var hasQueryParams = reqUrl.indexOf('?') !== -1
  reqUrl += (hasQueryParams) ? '&' : '?';
  reqUrl += 'locale=en_GB&apikey=' + config.apiKey;
  console.log(reqUrl);

  request.get({ url: reqUrl, json: true }, function(error, response, body) {
    if (response) {
      res.status(response.statusCode).json(body);
    }
  });
});

var SocketHandler = require('./app/handlers/socket').SocketHandler;
io.on('connection', function (socket) {
  socket.on('raidcomp', function (data) {
    SocketHandler.processMessage(data, function(socket, result) {
      io.emit(socket, result);
    });
  });
});

server.listen(5000);
}());
