'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Display people page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.display = function(req, res) {
  var userId = req.body.userId,
      peopleId = req.params.id;

  // Request main people informations
  apiCtrl.get('/person/'+peopleId,
    function (main) {

      // Request main people informations
      apiCtrl.get('/person/'+peopleId+'/combined_credits',
        function (credits) {

          // Request cover images
          apiCtrl.get('/person/'+peopleId+'/tagged_images',
            function (images) {
              res.locals.people = main;
              res.locals.credits = credits;
              res.locals.images = images.results;
              res.render('people');
            }, function (err) {
              res.locals.people = main;
              res.locals.credits = credits;
              res.render('people');
            });

        }, function (err) {
          res.locals.people = main;
          res.render('people');
        });

    }, function (err) {
      res.send('The people couldn\'t be found');
    });
};
