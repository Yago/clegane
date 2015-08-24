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

  request
    .get(api.url+'/movie/'+movieId)
    .query({
      api_key: api.key,
      language: api.lang
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
