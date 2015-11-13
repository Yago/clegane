'use strict';

var listCtrl    = require('../controllers/list.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/lists', auth.isAuthenticated, listCtrl.lists);
  app.get('/list/:id', auth.isAuthenticated, listCtrl.lists);

  // API part
  app.post('/lists', auth.isApiAuthenticated, listCtrl.list);
  app.post('/list/add', auth.isApiAuthenticated, listCtrl.add);
  app.post('/list/:id', auth.isApiAuthenticated, listCtrl.show);
  app.post('/list/:id/push/:item', auth.isApiAuthenticated, listCtrl.push);
  app.post('/list/:id/pull/:item', auth.isApiAuthenticated, listCtrl.pull);
  app.post('/list/:id/remove', auth.isApiAuthenticated, listCtrl.remove);

};
