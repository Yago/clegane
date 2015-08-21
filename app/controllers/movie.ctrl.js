'use strict';

var User        = require('../models/user.model'),
    config      = require('./../../config/config.js'),
    TheMovieDb  = require('themoviedb'),
    tmdb        = new TheMovieDb(config.tmdb, 'en'),
    request     = require('request');

/*
 * Search moview
 */
exports.search = function(req, res) {
  var query = req.body.keywords;
  tmdb.searchMovies({query: query, sortBy: 'popularity.desc', includeAdult: false}, function(err, movies) {
    if (err) {
      req.flash('error', 'An error happened during search.');
      res.redirect('/');
    }

    res.send(movies);
  });
};
