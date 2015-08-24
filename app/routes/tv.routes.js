'use strict';

var tvCtrl 		= require('../controllers/tv.ctrl'),
    auth      = require('../auth');

module.exports = function(app, passport) {

  app.get('/tv/:id', auth.isAuthenticated, tvCtrl.display);

};
