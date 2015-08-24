'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Display movie page
 */
exports.display = function(req, res) {
  var userId = req.body.userId,
      movieId = req.params.id;

  // Request main movie informations
  apiCtrl.get('/movie/'+movieId,
    function (main) {

      // Request credits
      apiCtrl.get('/movie/'+movieId+'/credits',
        function (credits) {
          res.locals.movie = main;
          res.locals.credits = credits;
          res.render('movie');
        }, function (err) {
          res.locals.movie = main;
          res.render('movie');
        });

    }, function (err) {
      res.send('The movie couldn\'t be found');
    });
};
