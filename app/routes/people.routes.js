'use strict';

var peopleCtrl 		= require('../controllers/people.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/people/:id', auth.isAuthenticated, peopleCtrl.display);

};
