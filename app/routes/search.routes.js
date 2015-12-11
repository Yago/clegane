'use strict';

var searchCtrl    = require('../controllers/search.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/search/:query/:page', auth.isAuthenticated, searchCtrl.results);
  app.get('/api/genre/:id/:page', auth.isAuthenticated, searchCtrl.genres);
  app.get('/api/tag/:id/:page', auth.isAuthenticated, searchCtrl.tags);
  app.get('/api/watched', auth.isAuthenticated, searchCtrl.watched);

};
