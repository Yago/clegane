'use strict';

/* global app */

app.factory('ApiService', function ($http, $rootScope, $state) {
  return {
    post: function (url, data, success, error) {
      $http({
          method: 'POST',
          url: url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
          },
          data: data
      }).then(function(res) {
        if (res.data.success) {
          success(res);
        } else {
          $rootScope.isAuthenticated = false;
          $rootScope.isMenu = 'never';
          localStorage.clear();
          sessionStorage.clear();
          $state.go('app.login');
        }
      }, function(err) {
        error(err);
      });
    },
    get: function (url, success, error) {
      $http.get(url).then(function(res) {
        if (res.data.success) {
          success(res);
        } else {
          $rootScope.isAuthenticated = false;
          $rootScope.isMenu = 'never';
          localStorage.clear();
          sessionStorage.clear();
          $state.go('app.login');
        }
      }, function(err) {
        error(err);
      });
    }
  };
});
