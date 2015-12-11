'use strict';

var userCtrl    = require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/', auth.isAuthenticated, userCtrl.dashboard);
  app.post('/api/signup', auth.checkUser, userCtrl.create);
  app.post('/api/login', passport.authenticate('login'), auth.authenticate);
  app.post('/api/update', auth.isAuthenticated, userCtrl.update);

};
