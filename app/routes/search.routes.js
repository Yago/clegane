'use strict';

var searchCtrl    = require('../controllers/search.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/search/:query/:page', auth.isAuthenticated, searchCtrl.results);
  app.get('/genre/:id/:page', auth.isAuthenticated, searchCtrl.genres);
  app.get('/tag/:id/:page', auth.isAuthenticated, searchCtrl.tags);
  app.get('/watched', auth.isAuthenticated, searchCtrl.watched);

};
