'use strict';

/* global app */

app.controller('MobileCtrl', function() {
  var that = this;

  that.open = false;

  that.toggleMenu = function () {
    if (that.open) {
      that.open = false;
    } else {
      that.open = true;
    }
  };

  that.closeMenu = function () {
    if (that.open) {
      that.open = false;
    }
  };

});
