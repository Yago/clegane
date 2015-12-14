'use strict';

/* global app */

app.controller('MainCtrl', function($rootScope, $ionicPopup, $ionicSideMenuDelegate) {
  var that = this;

  that.isAuthenticated = false;
  that.sidemenu = 'never';
  if ($rootScope.authenticated) {
    that.isAuthenticated = true;
    that.sidemenu = 'large';
  }

  //localStorage.clear();
  //sessionStorage.clear();
});
