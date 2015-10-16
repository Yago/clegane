'use strict';

var movieCtrl     = require('../controllers/movie.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.get('/movie/:id', auth.isAuthenticated, movieCtrl.display);

  // API part
  app.post('/movie/:id/add', auth.isApiAuthenticated, movieCtrl.add);

};
