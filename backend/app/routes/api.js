(function () {
'use strict';

var router = require('express').Router();
var Raid = require('../models/raidcomp').Raid;
var Character = require('../models/raidcomp').Character;

var generateCompId = function () {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
};

router.post('/', function (req, res, next) {
  var compId = generateCompId();

  Raid.create({ _compId: compId, raidIds: '0' }, function (err, raid) {
    if (err) {
      res.status(400).send({ error: 'There was an error creating the RaidComp.' });
      return;
    }
  });

  res.send({ compId: compId });
});

router.get('/:compId', function (req, res, next) {
  Raid
  .findOne({ _compId: req.params.compId })
  .exec(function (err, raid) {
    if (err || !raid) {
      res.status(404).send({ error: 'There\'s no RaidComp with this Id.' });
      return next();
    }

    Character
    .find({ _compId: req.params.compId })
    .exec(function (err, characters) {
      var response = {
        _compId: raid.compId,
        raidIds: raid.raidIds,
        characters: characters
      };
      res.send(response);
      return next();
    });

  });
});

module.exports = router;
}());