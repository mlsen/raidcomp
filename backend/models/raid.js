'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var characterSchema = new Schema({
	name: String,
	realm: String,
	region: String,
	className: String,
	spec: String,
	role: String
})

var raidSchema = new Schema({
	_compId: String,
	id: Number,
	characters: [characterSchema]
});

var Raid = mongoose.model('Raid', raidSchema);

module.exports = Raid;
