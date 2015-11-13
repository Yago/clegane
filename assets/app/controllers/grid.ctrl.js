'use strict';

/* global app, Isotope */

app.controller('GridCtrl', function(ApiService) {
  var that = this;

  that.filterActive = '';
  that.sortActive = '';
  that.sortDirection = true;

  that.init = function (key) {
    that.grid = document.querySelector('.grid');
    that.iso = new Isotope(that.grid, {
      itemSelector: '.grid-item',
      percentPosition: true,
      layoutMode: 'fitRows',
      getSortData: {
        movie: '.movie',
        tv: '.tv',
        name: '[data-name]',
        date: '[data-date]'
      },
      sortBy: 'date',
      sortAscending : false
    });
    //that.iso.shuffle();
  };

  that.filter = function (target) {
    that.filterActive = target;
    that.iso.arrange({
      filter: target
    });
  };

  that.sort = function (target) {
    that.sortActive = target;
    that.iso.arrange({
      sortBy: target,
      sortAscending : that.sortDirection
    });
    if (that.sortDirection) {
      that.sortDirection = false;
    } else {
      that.sortDirection = true;
    }
  };


});
