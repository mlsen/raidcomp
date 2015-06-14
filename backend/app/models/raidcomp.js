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

var raidCompSchema = new Schema({
	_compId: String,
  _shortCompId: String,
	raidIds: [String]
});

var Character = mongoose.model('Character', characterSchema);
var RaidComp = mongoose.model('RaidComp', raidCompSchema);

module.exports = {
  RaidComp: RaidComp,
  Character: Character
};
}());
