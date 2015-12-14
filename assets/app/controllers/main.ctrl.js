'use strict';

/* global app */

app.controller('MainCtrl', function($rootScope, $ionicPopup, $ionicSideMenuDelegate) {
  var that = this;

  that.isAuthenticated = false;
  if ($rootScope.token) {
    that.isAuthenticated = true;
  }

  //localStorage.clear();
  //sessionStorage.clear();
});
