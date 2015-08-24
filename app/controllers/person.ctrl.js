'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Display movie page
 */
exports.display = function(req, res) {
  var userId = req.body.userId,
      personId = req.params.id;

  // Request main movie informations
  apiCtrl.get('/person/'+personId,
    function (main) {

      // Request main movie informations
      apiCtrl.get('/person/'+personId+'/combined_credits',
        function (credits) {

          // Request cover images
          apiCtrl.get('/person/'+personId+'/tagged_images',
            function (images) {
              res.locals.person = main;
              res.locals.credits = credits;
              res.locals.images = images.results;
              res.render('person');
            }, function (err) {
              res.locals.person = main;
              res.locals.credits = credits;
              res.render('person');
            });

        }, function (err) {
          res.locals.person = main;
          res.render('person');
        });

    }, function (err) {
      res.send('The person couldn\'t be found');
    });
};
