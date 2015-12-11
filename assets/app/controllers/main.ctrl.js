'use strict';

/* global app */

app.controller('MainCtrl', function($ionicPopup, $ionicSideMenuDelegate) {
  var that = this;

  that.reset = function () {
    localStorage.clear();
    var alertPopup = $ionicPopup.alert({
       title: 'App\'s data cleared'
     });
  };

});
