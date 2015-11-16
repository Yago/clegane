'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    async       = require('async'),
    messages    = require('../../config/messages.json');

/*
 * Display search's results
 */
exports.results = function(req, res) {
  var userId = req.body.userId,
      query = req.params.query,
      page = req.params.page;

  // Request results based on search keywords
  apiCtrl.search('multi', query, page,
    function (data) {

      res.locals.data = data;
      res.locals.query = query;
      res.locals.type = 'search';
      res.render('results');

    }, function (err) {
      res.send('No result founded');
    });
};

/*
 * Display genre's results
 */
exports.genres = function(req, res) {
  var userId = req.body.userId,
      genreId = req.params.id,
      page = req.params.page;

  // Request genre results
  apiCtrl.getpage('/genre/'+genreId+'/movies', page,
    function (data) {

      // Request genre infos
        apiCtrl.get('/genre/'+genreId,
          function (genre) {

            res.locals.data = data;
            res.locals.query = genreId;
            res.locals.type = 'genre';
            res.locals.genre = genre;
            res.render('results');

          }, function (err) {
            res.locals.data = data;
            res.locals.query = genreId;
            res.locals.type = 'genre';
            res.render('results');
          });

    }, function (err) {
      res.send('No result founded');
    });
};

/*
 * Display tag's results
 */
exports.tags = function(req, res) {
  var userId = req.body.userId,
      tagId = req.params.id,
      page = req.params.page;

  // Request tag's results
  apiCtrl.getpage('/keyword/'+tagId+'/movies', page,
    function (data) {

      // Request tag's infos
        apiCtrl.get('/keyword/'+tagId,
          function (tag) {

            res.locals.data = data;
            res.locals.query = tagId;
            res.locals.type = 'tag';
            res.locals.tag = tag;
            res.render('results');

          }, function (err) {
            res.locals.data = data;
            res.locals.query = tagId;
            res.locals.type = 'tag';
            res.render('results');
          });

    }, function (err) {
      res.send('No result founded');
    });
};

/*
 * Send watched items
 */
exports.watched = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      if (!user) {return res.status(500).send(messages.errors.user_error);}

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
          if (err) {res.status(500).send(messages.errors.default_error);}
          res.locals.watched = watchedArray;
          //res.send(res.locals.watched);
          res.render('watched');
      });
    });
};
