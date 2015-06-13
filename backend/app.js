(function () {
'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyparser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/raidcomp');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//  // do stuff
// });

//app.use(bodyparser.json());

var router = require('./app/routes/api');
app.use('/comp', router);

// debug
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/client.html');
});

var SocketActions = require('./app/actions/socket');
io.on('connection', function (socket) {
  socket.on('raidcomp', function (data) {
    SocketActions.processMessage(data, function(socket, result) {
      io.emit(socket, result);
    });
  });
});

server.listen(5000);
}());
