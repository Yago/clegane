'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    async       = require('async'),
    messages    = require('../../config/messages.json');

/*
 * Display search's results
 */
exports.results = function(req, res) {
  var userId = req.decoded.id,
      query = req.params.query,
      page = req.params.page;

  var data = {};

  // Request results based on search keywords
  apiCtrl.search('multi', query, page,
    function (main) {

      data.query = query;
      data.type = 'search';
      data.data = main;
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
 * Display genre's results
 */
exports.genres = function(req, res) {
  var userId = req.decoded.id,
      genreId = req.params.id,
      page = req.params.page;

  var data = {};

  // Request genre results
  apiCtrl.getpage('/genre/'+genreId+'/movies', page,
    function (main) {

      // Request genre infos
        apiCtrl.get('/genre/'+genreId,
          function (genre) {

            data.query = genreId;
            data.type = 'genre';
            data.genre = genre;
            data.data = main;
            res.json({
              success: true,
              data: data
            });

          }, function (err) {
            data.query = genreId;
            data.type = 'genre';
            data.data = main;
            res.json({
              success: true,
              data: data
            });
          });

    }, function (err) {
      res.json({
        success: false,
        message: messages.errors.api_error
      });
    });
};

/*
 * Display tag's results
 */
exports.tags = function(req, res) {
  var userId = req.decoded.id,
      tagId = req.params.id,
      page = req.params.page;

  var data = {};

  // Request tag's results
  apiCtrl.getpage('/keyword/'+tagId+'/movies', page,
    function (main) {

      // Request tag's infos
        apiCtrl.get('/keyword/'+tagId,
          function (tag) {

            data.query = tagId;
            data.type = 'tag';
            data.tag = tag;
            data.data = main;
            res.json({
              success: true,
              data: data
            });

          }, function (err) {
            data.query = tagId;
            data.type = 'tag';
            data.data = main;
            res.json({
              success: true,
              data: data
            });
          });

    }, function (err) {
      res.json({
        success: false,
        message: messages.errors.api_error
      });
    });
};

/*
 * Send watched items
 */
exports.watched = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}

      var watchedArray = {};
      watchedArray.movies = [];
      watchedArray.tvs = [];

      async.waterfall([
          // Iterate over user's movies and if they are watched, add to watchedArray
          function(callback) {
            async.each(user.movies, function(movie, eachCallback) {
                if (movie.watched) {
                  movie.type = 'movie';
                  watchedArray.movies.push(movie);
                }
                eachCallback();
              }, function(err){
                if( err ) {// console.log(err);
                } else {callback(null);}
              });
          },
          // Then iterate over user's tvs and if they have watched episodes, add to watchedArray
          function(callback) {
            async.each(user.tvs, function(tv, eachCallback) {
                if (tv.episodes.length > 0) {
                  watchedArray.tvs.push(tv);
                  eachCallback();
                } else {
                  eachCallback();
                }
              }, function(err){
                if( err ) {// console.log(err);
                } else {callback(null);}
              });
          },
      ], function (err, result) {
          if (err) {res.json({success: false, message: messages.errors.default_error});}
          res.json({
            success: true,
            data: watchedArray
          });
      });
    });
};
