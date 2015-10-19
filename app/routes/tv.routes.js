'use strict';

var tvCtrl    = require('../controllers/tv.ctrl'),
    auth      = require('../auth');

module.exports = function(app, passport) {

  app.get('/tv/:id', auth.isAuthenticated, tvCtrl.display);

  // API part
  app.post('/tvs', auth.isApiAuthenticated, tvCtrl.list);
  app.post('/tv/:id/add', auth.isApiAuthenticated, tvCtrl.add);
  app.post('/tv/:id/watch/:episode', auth.isApiAuthenticated, tvCtrl.watch);
  app.post('/tv/:id/remove', auth.isApiAuthenticated, tvCtrl.remove);

};
