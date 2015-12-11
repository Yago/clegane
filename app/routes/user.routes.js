'use strict';

var userCtrl    = require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  //app.get('/', userCtrl.index);
  app.get('/', auth.isAuthenticated, userCtrl.dashboard);
  app.get('/about', auth.isAuthenticated, userCtrl.about);

  app.get('/api', auth.haveApiKey, userCtrl.api);

  app.get('/login', userCtrl.login);
  app.post('/login', passport.authenticate('login'), auth.authenticate);

  app.get('/signup', userCtrl.signup);
  app.post('/signup', auth.checkUser, userCtrl.create);
  app.get('/signup/completed', userCtrl.signupCompleted);

  app.get('/settings', auth.isAuthenticated, userCtrl.settings);
  app.post('/settings', auth.isAuthenticated, userCtrl.update);

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
