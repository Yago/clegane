'use strict';

/* global app */

app.factory('StorageService', function ($http) {
  return {
    save: function (key, data) {
      sessionStorage[key] = angular.toJson(data);
    },
    get : function (key) {
      return sessionStorage[key];
    }
  };
});
