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
 * Params: key, name, imdb_id
 */
exports.add = function(req, res) {
  var userId  = req.body.userId,
      watched = false;

  // If toggle watch request
  if (req.body.watch) {
    watched = req.body.watch;
  }

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
                imdb_id: req.body.imdb_id,
                watched: watched
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
 * Toggle watch of a Movie
 * Params: key, name, imdb_id, watch (boolean)
 */
exports.watchToggle = function(req, res) {
  var userId = req.body.userId;

  User.findOneAndUpdate({_id:userId, 'movies.tmdb_id': req.params.id},
    {
      $set : {
        'movies.$.watched': req.body.watch
      }
    }, function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}

      // If no movie exist, create one watched
      if (!user) {
        module.exports.add(req, res);
      } else {
        res.send(messages.success.movie_watched);
      }

    });

};

/*
 * Remove a Movie from User
 * Params: key
 */
exports.remove = function(req, res) {
  var userId = req.body.userId;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          movies : {
            tmdb_id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {return res.send(messages.errors.default_error);}
        if (!user) {return res.send(messages.errors.user_notfound);}
        res.send(messages.success.movie_removed);
      });

};

/*
 * List User's movies
 * Params: key
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
