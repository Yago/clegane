'use strict';

var userCtrl    = require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  //app.get('/', userCtrl.index);
  app.get('/', auth.isAuthenticated, userCtrl.dashboard);

  app.post('/signup', auth.checkUser, userCtrl.create);
  app.post('/login', passport.authenticate('login'), auth.authenticate);

  app.post('/settings', auth.isAuthenticated, userCtrl.update);

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
