'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    messages    = require('../../config/messages.json');

/*
 * Display movie page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
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

                  // Request keywords
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

/*
 * Add a Movie to User
 */
exports.add = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId, 'movies.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}

      // Check if movie already exist in User
      if (!user) {

        // Add movie
        User.findOneAndUpdate({_id:userId},
          {
            $push : {
              movies : {
                name: req.body.name,
                tmdb_id: req.params.id,
                imdb_id: req.body.imdb_id
              }
            }
          }, function (err, user) {
            if (err) {return res.send(messages.errors.default_error);}
            if (!user) {return res.send(messages.errors.user_notfound);}
            res.send(messages.success.movie_added);
          });
      } else {
        res.send(messages.errors.movie_exist);
      }
    });
};

/*
 * List User's movies
 */
exports.list = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}
      if (!user) {return res.send(messages.errors.user_notfound);}
      res.send(user.movies);
    });
};
