'use strict';

var movieCtrl     = require('../controllers/movie.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/api/movie/:id', auth.isAuthenticated, movieCtrl.display);
  app.get('/api/movies/:list/:page', auth.isAuthenticated, movieCtrl.discover);
  app.post('/api/movies', auth.isAuthenticated, movieCtrl.list);
  app.post('/api/movie/:id/add', auth.isAuthenticated, movieCtrl.add);
  app.post('/api/movie/:id/watch', auth.isAuthenticated, movieCtrl.watch);
  app.post('/api/movie/:id/remove', auth.isAuthenticated, movieCtrl.remove);

};
