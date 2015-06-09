var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://mongo/raidcomp');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//	// do stuff
// });

app.use(bodyparser.json());

app.post('/api/comp', function (req, res ) {
	res.send('post.api.comp');
});

app.get('/api/comp/:compid/', function (req, res) {
	res.send('get.api.comp.' + req.params.compid);
});

app.get('/api/comp/:compid/raids', function (req, res) {
	res.send('get.api.comp.' + req.params.compid + '.raids');
});

app.put('/api/comp/:compid/raids', function (req, res) {
	res.send('get.api.comp.' + req.params.compid + '.raids');
});

app.get('/api/comp/:compid/chars', function (req, res) {
	res.send('get.api.comp.' + req.params.compid + '.chars');
});

app.put('/api/comp/:compid/chars', function (req, res) {
	res.send('get.api.comp.' + req.params.compid + '.chars');
});


var server = app.listen(5000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on http://%s:%s', host, port);

})
