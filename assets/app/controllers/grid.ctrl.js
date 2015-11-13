'use strict';

/* global app, Isotope */

app.controller('GridCtrl', function(ApiService) {
  var that = this;

  that.ready = false;
  that.filterActive = '';
  that.sortActive = '';
  that.sortDirection = true;

  that.init = function (key, sort) {
    var sortAscending = true;
    if (sort === 'descending') {
      sortAscending = false;
    }
    that.grid = document.querySelector('.grid');
    that.iso = new Isotope(that.grid, {
      itemSelector: '.grid-item',
      percentPosition: true,
      layoutMode: 'fitRows',
      transitionDuration: '0.3s',
      getSortData: {
        movie: '.movie',
        tv: '.tv',
        people: '.people',
        watched: '.watched',
        notwatched: '.not-watched',
        name: '[data-name]',
        date: '[data-date]'
      }
    });
    that.iso.arrange({
      sortBy: 'date',
      sortAscending : sortAscending
    });
    that.iso.once( 'arrangeComplete', function() {
      that.ready = true;
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
