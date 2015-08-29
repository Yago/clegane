'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Display search results
 */
exports.results = function(req, res) {
  var userId = req.body.userId,
      query = req.params.query,
      page = req.params.page;

  // Request main movie informations
  apiCtrl.search('multi', query, page,
    function (data) {

      res.locals.data = data;
      res.locals.query = query;
      res.render('results');

    }, function (err) {
      res.send('No result founded');
    });
};
