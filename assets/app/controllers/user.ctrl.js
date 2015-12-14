'use strict';

/* global app */

app.controller('UserCtrl', function($state, $ionicPopup, ApiService, $rootScope) {
  var that = this;

  // User's login
  that.login = function () {
    if (!that.username || !that.password) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Username or Password are missing.'
      });
    } else {
      var url = 'LOCAL_API/login',
          data = {
            username: that.username,
            password: that.password
          };

      ApiService.post(url, data, function (res) {
        if (that.remember) {
          localStorage.cleganeToken = res.data.token;
          $rootScope.authenticated = true;
          $state.go('app.dashboard');
        } else {
          sessionStorage.cleganeToken = res.data.token;
          $rootScope.authenticated = true;
          $state.go('app.dashboard');
        }
      }, function (err) {
        $ionicPopup.alert({
          title: 'Error',
          template: err.data
        });
      });
    }
  };

});
