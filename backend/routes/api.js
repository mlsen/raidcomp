var router = require('express').Router();
var Raid = require('../models/raid').model;

var generateCompId = function () {
  var idLength = 32;
  var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i=0; i < idLength; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
}

router.post('/', function (req, res, next) {
  var compid = generateCompId();

  for (var i = 0; i < 2; i++) {
    Raid.create({_compid: compid, id: i}, function (err, raid) {
      if (err) return handleError();
    });
  }

  res.send({compid: compid});
});

router.get('/:compid', function (req, res, next) {
  Raid.find({_compid: req.params.compid})
    .exec(function (err, raids) {
      if (err) return handleError(err);

      if (!raids.length) {
        res.status(404).send({error: 'There\'s no RaidComp with this Id.'});
        return next();
      }
      console.log(raids);
      res.send(raids);
    });
});

module.exports = router;
