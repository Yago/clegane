'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

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
