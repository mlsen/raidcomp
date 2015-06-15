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
  role: String,
  ilvl: Number,
  legendaryStage: Number
});

var Character = mongoose.model('Character', characterSchema);

module.exports = {
  Character: Character
};
}());
