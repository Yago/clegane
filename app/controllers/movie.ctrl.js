'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    messages    = require('../../config/messages.json');

/*
 * Display movie page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.display = function(req, res) {
  var userId = req.decoded.id,
      movieId = req.params.id;

  var data = {};

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

                  // Request tokenwords
                  apiCtrl.get('/movie/'+movieId+'/tokenwords',
                    function (tokenwords) {
                      data.movie = main;
                      data.credits = credits;
                      data.similar = similar.results;
                      data.videos = videos.results;
                      data.tokenwords = tokenwords.tokenwords;
                      res.json({
                        success: true,
                        data: data
                      });
                    }, function (err) {
                      data.movie = main;
                      data.credits = credits;
                      data.similar = similar.results;
                      data.videos = videos.results;
                      res.json({
                        success: true,
                        data: data
                      });
                    });

                }, function (err) {
                  data.movie = main;
                  data.credits = credits;
                  data.similar = similar.results;
                  res.json({
                    success: true,
                    data: data
                  });
                });

            }, function (err) {
              data.movie = main;
              data.credits = credits;
              res.json({
                success: true,
                data: data
              });
            });

        }, function (err) {
          data.movie = main;
          res.json({
            success: true,
            data: data
          });
        });

    }, function (err) {
      res.send('The movie couldn\'t be found');
    });
};

/*
 * Display discover movies page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.discover = function(req, res) {
  var userId = req.decoded.id,
      list = req.params.list,
      page = req.params.page;

  var data = {};

  // Request main movie informations
  apiCtrl.discover('movie', list, page,
    function (main) {

      data.type = 'movies';
      data.query = list;
      data.data = main;
      data.lists = ['popular', 'now_playing', 'upcoming'];
      res.json({
        success: true,
        data: data
      });

    }, function (err) {
      res.json({
        success: false,
        message: messages.errors.api_error
      });
    });
};

/*
 * Add a Movie to User
 * Params: token, name, picture, imdb_id
 */
exports.add = function(req, res) {
  var userId = req.decoded.id,
      watched = false;

  // If toggle watch request
  if (req.body.watch) {
    watched = req.body.watch;
  }

  User.findOne({_id:userId, 'movies.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}

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
                picture: req.body.picture,
                watched: watched,
                watched_on: Date.now()
              }
            }
          }, function (err, user) {
            if (err) {res.json({success: false, message: messages.errors.default_error});}
            if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
            res.json({
              success: true,
              message: messages.success.movie_added
            });
          });
      } else {
        res.json({success: false, message: messages.errors.movie_exist});
      }
    });
};

/*
 * Toggle watch of a Movie
 * Params: token, name, imdb_id, watch (boolean)
 */
exports.watch = function(req, res) {
  var userId = req.decoded.id;

  User.findOneAndUpdate({_id:userId, 'movies.tmdb_id': req.params.id},
    {
      $set : {
        'movies.$.watched': req.body.watch,
        'movies.$.watched_on': Date.now()
      }
    }, function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}

      // If no movie exist, create one watched
      if (!user) {
        module.exports.add(req, res);
      } else {
        res.json({
          success: true,
          message: messages.success.movie_watched
        });
      }

    });

};

/*
 * Remove a Movie from User
 * Params: token
 */
exports.remove = function(req, res) {
  var userId = req.decoded.id;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          movies : {
            tmdb_id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {res.json({success: false, message: messages.errors.default_error});}
        if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
        res.json({
          success: true,
          message: messages.success.movie_removed
        });
      });

};

/*
 * List User's movies
 * Params: token
 */
exports.list = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      res.json({
        success: true,
        data: user.movies
      });
    });
};
