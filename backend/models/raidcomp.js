(function () {
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var characterSchema = new Schema({
  _compId: String,
  raidId: String,
  id: String,
	name: String,
	realm: String,
	region: String,
	className: String,
	spec: String,
	role: String
});

var raidSchema = new Schema({
	_compId: String,
	raidIds: [String]
});

var Character = mongoose.model('Character', characterSchema);
var Raid = mongoose.model('Raid', raidSchema);

module.exports = {
  Raid: Raid,
  Character: Character
};
}());
