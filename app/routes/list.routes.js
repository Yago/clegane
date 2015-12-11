'use strict';

var listCtrl    = require('../controllers/list.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/lists', auth.isAuthenticated, listCtrl.lists);
  app.get('/list/:id', auth.isAuthenticated, listCtrl.lists);

  // API part
  app.post('/lists', auth.isAuthenticated, listCtrl.list);
  app.post('/list/add', auth.isAuthenticated, listCtrl.add);
  app.post('/list/:id', auth.isAuthenticated, listCtrl.show);
  app.post('/list/:id/push/:item', auth.isAuthenticated, listCtrl.push);
  app.post('/list/:id/pull/:item', auth.isAuthenticated, listCtrl.pull);
  app.post('/list/:id/remove', auth.isAuthenticated, listCtrl.remove);

};
