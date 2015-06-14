(function () {
'use strict';

var router = require('express').Router();
var RaidComp = require('../models/raidcomp').RaidComp;
var Character = require('../models/raidcomp').Character;

var generateCompId = function () {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
};

router.post('/', function (req, res, next) {
  var compId = generateCompId();

  RaidComp.create({ _compId: compId, _shortCompId: compId.slice(0, 10), raidIds: '0' }, function (err, raid) {
    if (err) {
      res.status(400).send({ error: 'There was an error creating the RaidComp.' });
      return;
    }
  });

  res.send({ compId: compId });
});

module.exports = router;
}());
