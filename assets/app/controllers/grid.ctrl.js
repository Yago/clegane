'use strict';

/* global app, Isotope */

app.controller('GridCtrl', function(ApiService) {
  var that = this;

  that.init = function (key) {
    that.grid = document.querySelector('.grid');
    that.iso = new Isotope(that.grid, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows',
      getSortData: {
        movie: '.movie',
        tv: '.tv'
      }
    });
    that.iso.shuffle();
  };

  that.filter = function (target) {
    that.iso.arrange({
      filter: target
    });
  };


});
