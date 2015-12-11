'use strict';

var tvCtrl    = require('../controllers/tv.ctrl'),
    auth      = require('../auth');

module.exports = function(app, passport) {

  app.get('/tv/:id', auth.isAuthenticated, tvCtrl.display);
  app.get('/tvs/:list/:page', auth.isAuthenticated, tvCtrl.discover);

  // API part
  app.post('/tvs', auth.isAuthenticated, tvCtrl.list);
  app.post('/tv/:id/add', auth.isAuthenticated, tvCtrl.add);
  app.post('/tv/:id/watch/:episode', auth.isAuthenticated, tvCtrl.watch);
  app.post('/tv/:id/remove', auth.isAuthenticated, tvCtrl.remove);

};
