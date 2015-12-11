'use strict';

var movieCtrl     = require('../controllers/movie.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/movie/:id', auth.isAuthenticated, movieCtrl.display);
  app.get('/movies/:list/:page', auth.isAuthenticated, movieCtrl.discover);

  // API part
  app.post('/movies', auth.isAuthenticated, movieCtrl.list);
  app.post('/movie/:id/add', auth.isAuthenticated, movieCtrl.add);
  app.post('/movie/:id/watch', auth.isAuthenticated, movieCtrl.watch);
  app.post('/movie/:id/remove', auth.isAuthenticated, movieCtrl.remove);

};
