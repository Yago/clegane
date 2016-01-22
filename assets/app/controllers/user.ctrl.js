'use strict';

/* global app */

app.controller('UserCtrl', function($state, $ionicPopup, ApiService, $rootScope) {
  var that = this;

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

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
          window.location.replace("/");
        }
      }, function (err) {
        $ionicPopup.alert({
          title: 'Error',
          template: err.data
        });
      });
    }
  };

  // User's logout
  that.logout = function () {
    if (localStorage.cleganeToken) {
      localStorage.clear();
    } else if (sessionStorage.cleganeToken) {
      sessionStorage.clear();
    }
    window.location.replace("/");
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

  // Get user data
  that.informations = function () {
    ApiService.get('LOCAL_API/user?token='+that.token,
      function (res) {
        if (res.data.success) {
          that.data = res.data.data;
        }
      }, function (err) {
        console.log(err);
      });
  };

  // User's update
  that.update = function () {
    if (that.emailcheck && that.data.email !== that.emailcheck) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Email and Email confirmation are not the same.'
      });
    }

    if (that.password && that.password !== that.passwordcheck) {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Password and Password confirmation are not the same.'
      });
    }

    if ((that.emailcheck && that.data.email === that.emailcheck) || (that.password && that.password === that.passwordcheck)) {
      var url = 'LOCAL_API/update',
          data = {
            token: that.token
          };

      if (that.emailcheck) {
        data.email = that.emailcheck;
      }
      if (that.password) {
        data.password = that.password;
      }

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
