'use strict';

/* global app */

app.factory('ApiService', function ($http) {
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
        success(res);
      }, function(err) {
        error(err);
      });
    },
    get: function (url, success, error) {
      $http.get(url).then(function(res) {
        success(res);
      }, function(err) {
        error(err);
      });
    }
  };
});
