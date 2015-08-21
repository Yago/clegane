'use strict';

var movieCtrl 		= require('../controllers/movie.ctrl'),
    auth          = require('../auth');

module.exports = function(app, passport) {

  app.post('/movie/search', auth.isAuthenticated, movieCtrl.search);

};
