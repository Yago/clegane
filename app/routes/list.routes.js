'use strict';

var listCtrl    = require('../controllers/list.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/lists', auth.isAuthenticated, listCtrl.lists);
  app.get('/api/list/:id', auth.isAuthenticated, listCtrl.lists);
  app.post('/api/lists', auth.isAuthenticated, listCtrl.list);
  app.post('/api/list/add', auth.isAuthenticated, listCtrl.add);
  app.post('/api/list/:id', auth.isAuthenticated, listCtrl.show);
  app.post('/api/list/:id/push/:item', auth.isAuthenticated, listCtrl.push);
  app.post('/api/list/:id/pull/:item', auth.isAuthenticated, listCtrl.pull);
  app.post('/api/list/:id/remove', auth.isAuthenticated, listCtrl.remove);

};
