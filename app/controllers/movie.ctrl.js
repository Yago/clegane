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

          // Request similar movies
          apiCtrl.get('/movie/'+movieId+'/similar',
            function (similar) {

              // Request videos
              apiCtrl.get('/movie/'+movieId+'/videos',
                function (videos) {

                  // Request videos
                  apiCtrl.get('/movie/'+movieId+'/keywords',
                    function (keywords) {
                      res.locals.movie = main;
                      res.locals.credits = credits;
                      res.locals.similar = similar.results;
                      res.locals.videos = videos.results;
                      res.locals.keywords = keywords.keywords;
                      res.render('movie');
                    }, function (err) {
                      res.locals.movie = main;
                      res.locals.credits = credits;
                      res.locals.similar = similar.results;
                      res.locals.videos = videos.results;
                      res.render('movie');
                    });

                }, function (err) {
                  res.locals.movie = main;
                  res.locals.credits = credits;
                  res.locals.similar = similar.results;
                  res.render('movie');
                });

            }, function (err) {
              res.locals.movie = main;
              res.locals.credits = credits;
              res.render('movie');
            });

        }, function (err) {
          res.locals.movie = main;
          res.render('movie');
        });

    }, function (err) {
      res.send('The movie couldn\'t be found');
    });
};
