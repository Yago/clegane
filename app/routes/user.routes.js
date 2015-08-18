'use strict';

var User 				= require('../models/user.model'),
    userCtrl 		= require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  app.get('/', userCtrl.index);
  app.get('/', auth.haveApiKey, userCtrl.dashboard);

  app.get('/api', auth.haveApiKey, userCtrl.api);

  app.get('/login', userCtrl.login);
  app.post('/login', passport.authenticate('login', {successRedirect: '/', failureRedirect: '/login' }));

  app.get('/signup', userCtrl.signup);
  app.post('/signup', auth.checkUser, userCtrl.create);
  app.get('/signup/completed', userCtrl.signupCompleted);

  app.get('/settings', auth.isAuthenticated, userCtrl.settings);
  app.post('/settings', auth.isApiAuthenticated, userCtrl.update);

  app.get('/logout', function(req, res, passport) {
    req.logout();
    res.redirect('/');
  });
};
