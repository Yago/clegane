'use strict';

var searchCtrl    = require('../controllers/search.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/search/:query/:page', auth.isAuthenticated, searchCtrl.results);

};
