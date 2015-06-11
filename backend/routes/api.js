'use strict';

var router = require('express').Router();
var Raid = require('../models/raid');

var generateCompId = function () {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

router.post('/', function (req, res, next) {
  var compId = generateCompId();

  for (var i = 0; i < 2; i++) {
    Raid.create({ _compId: compId, id: i }, function (err, raid) {
      if (err) return handleError();
    });
  }

  res.send({ compId: compid });
});

router.get('/:compId', function (req, res, next) {
  Raid.find({ _compId: req.params.compId })
    .exec(function (err, raids) {
      if (err) return handleError(err);
      if (!raids.length) {
        res.status(404).send({ error: 'There\'s no RaidComp with this Id.' });
        return next();
      }

      res.send(raids);
      return next();
    });
});

module.exports = router;
