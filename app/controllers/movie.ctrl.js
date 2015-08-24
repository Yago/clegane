'use strict';

var User        = require('../models/user.model'),
    config      = require('./../../config/config.js'),
    TheMovieDb  = require('themoviedb'),
    tmdb        = new TheMovieDb(config.tmdb, 'en'),
    request     = require('superagent');

/*
 * Display movie page
 */
exports.display = function(req, res, next) {
  var userId = req.body.userId,
      movieId = req.params.id,
      movie = {};

  request
    .get('http://api.themoviedb.org/3/movie/'+movieId)
    .query({
      api_key: config.tmdb,
      language: 'en'
    })
    .set('Accept', 'application/json')
    .end(function(err, resp){
      if (err) {
        req.flash('error', 'The movie couldn\'t be found');
      }
      res.locals.movie = resp.body;
      res.render('movie');
    });
};

/*
 * Search movie
 */
exports.search = function(req, res) {
  var query = req.body.keywords;

  tmdb.searchMovies({query: query, sortBy: 'popularity.desc', includeAdult: false}, function(err, movies) {
    if (err) {
      req.flash('error', 'An error happened during search : ' + err);
      res.redirect('/');
    }
    res.send(movies);
  });
};
