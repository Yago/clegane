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
          $rootScope.isAuthenticated = true;
          $state.go('app.dashboard');
        } else {
          sessionStorage.cleganeToken = res.data.token;
          $rootScope.isAuthenticated = true;
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

  // User's sign up
  that.signup = function () {
    if (!that.username || !that.password || !that.email) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Username, Email or Password are missing.'
      });
    }

    if (that.email !== that.emailcheck) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Email and Email confirmation are not the same.'
      });
    }

    if (that.password !== that.passwordcheck) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Password and Password confirmation are not the same.'
      });
    }

    if (that.username && that.password && that.email && that.email === that.emailcheck && that.password === that.passwordcheck) {
      var url = 'LOCAL_API/signup',
          data = {
            username: that.username,
            email: that.email,
            password: that.password
          };

      ApiService.post(url, data, function (res) {
        if (res.data.success) {
          $ionicPopup.alert({
            title: 'Success !',
            template: res.data.message
          }).then(function(res) {
            $state.go('app.login');
          });
        } else {
          $ionicPopup.alert({
            title: 'Error',
            template: res.data.message
          });
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
