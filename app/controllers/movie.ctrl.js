'use strict';

var User        = require('../models/user.model'),
    api         = require('./../../config/api.js'),
    request     = require('superagent');

/*
 * Display movie page
 */
exports.display = function(req, res) {
  var userId = req.body.userId,
      movieId = req.params.id;

  // Request main movie informations
  request
    .get(api.url+'/movie/'+movieId)
    .query({
      api_key: api.key,
      language: api.lang
    })
    .set('Accept', 'application/json')
    .end(function(err, main){
      if (err) {
        req.flash('error', 'The movie couldn\'t be found');
      }

      // Request credits
      request
        .get(api.url+'/movie/'+movieId+'/credits')
        .query({
          api_key: api.key,
          language: api.lang
        })
        .set('Accept', 'application/json')
        .end(function(err, credits){
          if (err) {
            console.log('error');
            res.locals.movie = main.body;
            res.render('movie');
          }
          res.locals.movie = main.body;
          res.locals.credits = credits.body;
          res.render('movie');
        }); // End credits

    }); // End main informations
};
