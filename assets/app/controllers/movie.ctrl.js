'use strict';

/* global app, angular, lubTmdbApi */

app.controller('movieCtrl', function(lubTmdbApi) {
  var that = this;

  that.test = 'Inception';
  that.searchResults = 'some stuff...';

  that.search = function(type, method, query){
    lubTmdbApi[type][method]({
        query: query
    }).then(
      function (results) {
        that.searchResults = results;
      },
      function (results) {
        that.searchResults = results;
      }
    );
  };
});
