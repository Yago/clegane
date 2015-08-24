'use strict';

var personCtrl 		= require('../controllers/person.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/person/:id', auth.isAuthenticated, personCtrl.display);

};
