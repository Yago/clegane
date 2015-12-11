'use strict';

var userCtrl    = require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  app.get('/', auth.isAuthenticated, userCtrl.dashboard);
  app.post('/signup', auth.checkUser, userCtrl.create);
  app.post('/login', passport.authenticate('login'), auth.authenticate);
  app.post('/update', auth.isAuthenticated, userCtrl.update);

};
