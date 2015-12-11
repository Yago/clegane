'use strict';

var peopleCtrl 		= require('../controllers/people.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/people/:id', auth.isAuthenticated, peopleCtrl.display);
  app.get('/api/peoples/:list/:page', auth.isAuthenticated, peopleCtrl.discover);
  app.post('/api/peoples', auth.isAuthenticated, peopleCtrl.list);
  app.post('/api/people/:id/add', auth.isAuthenticated, peopleCtrl.add);
  app.post('/api/people/:id/remove', auth.isAuthenticated, peopleCtrl.remove);

};
