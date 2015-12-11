'use strict';

var userCtrl    = require('../controllers/user.ctrl'),
    auth        = require('../auth');

module.exports = function(app, passport) {

  app.post('/signup', auth.checkUser, userCtrl.create);
  app.post('/login', passport.authenticate('login'), auth.authenticate);
  app.post('/update', auth.isAuthenticated, userCtrl.update);

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
