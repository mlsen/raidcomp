(function () {
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var raidCompSchema = new Schema({
	_compId: String,
  _shortCompId: String,
	raidIds: [String]
});

var RaidComp = mongoose.model('RaidComp', raidCompSchema);

module.exports = {
  RaidComp: RaidComp
};
}());
