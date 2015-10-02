'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Add year and heading informations instead of inside template
 */
function addInformations (item) {
  var media = item;

  if (media.media_type === 'movie') {
    if (media.release_date) {
      media.year = parseInt(media.release_date.split('-')[0]);
    } else {
      media.year = 0;
    }
    if (media.title) {
      media.heading = media.title;
    } else {
      media.heading = '-';
    }
  } else {
    if (media.first_air_date) {
      media.year = parseInt(media.first_air_date.split('-')[0]);
    } else {
      media.year = 0;
    }
    if (media.name) {
      media.heading = media.name;
    } else {
      media.heading = '-';
    }
  }

  return media;
}

/*
 * Prepare credits to be sorted
 */
function prepareCredits (credits) {
  var output = {};

  output.cast = [];
  output.crew = [];

  credits.cast.forEach(function(cast){
    output.cast.push(addInformations(cast));
  });

  credits.crew.forEach(function(crew){
    output.crew.push(addInformations(crew));
  });

  return output;
}

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

      // Request cast and crew informations
      apiCtrl.get('/person/'+peopleId+'/combined_credits',
        function (credits) {

          // Request cover images
          apiCtrl.get('/person/'+peopleId+'/tagged_images',
            function (images) {
              res.locals.people = main;
              res.locals.credits = prepareCredits(credits);
              res.locals.images = images.results;
              res.locals.currentyear = new Date().getFullYear();
              res.render('people');
            }, function (err) {
              res.locals.people = main;
              res.locals.credits = prepareCredits(credits);
              res.locals.currentyear = new Date().getFullYear();
              res.render('people');
            });

        }, function (err) {
          res.locals.people = main;
          res.locals.currentyear = new Date().getFullYear();
          res.render('people');
        });

    }, function (err) {
      res.send('The people couldn\'t be found');
    });
};
