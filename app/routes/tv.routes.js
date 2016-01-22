'use strict';

var tvCtrl    = require('../controllers/tv.ctrl'),
    auth      = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/tv/:id', auth.isAuthenticated, tvCtrl.display);
  app.get('/api/tvs/:list/:page', auth.isAuthenticated, tvCtrl.discover);
  app.post('/api/tvs', auth.isAuthenticated, tvCtrl.list);
  app.post('/api/tv/:id/add', auth.isAuthenticated, tvCtrl.add);
  app.post('/api/tv/:id/watch/:episode', auth.isAuthenticated, tvCtrl.watch);
  app.post('/api/tv/:id/remove', auth.isAuthenticated, tvCtrl.remove);

};
