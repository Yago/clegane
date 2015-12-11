'use strict';

var peopleCtrl 		= require('../controllers/people.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/people/:id', auth.isAuthenticated, peopleCtrl.display);
  app.get('/peoples/:list/:page', auth.isAuthenticated, peopleCtrl.discover);

  // API part
  app.post('/peoples', auth.isAuthenticated, peopleCtrl.list);
  app.post('/people/:id/add', auth.isAuthenticated, peopleCtrl.add);
  app.post('/people/:id/remove', auth.isAuthenticated, peopleCtrl.remove);

};
