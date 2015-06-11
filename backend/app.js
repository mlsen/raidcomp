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

app.use(bodyparser.json());

router = require('./routes/api');
app.use('/comp', router);

// debug
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});

socketActions = require('./actions/socket');
io.on('connection', function (socket) {
  socket.on('raidcomp', function (data) {
    socketActions.processMessage(data);
  });
});

server.listen(5000);
