'use strict';

/* global angular */

var app = angular.module('CleganeApp',
            ['ngSanitize', 'ngTouch', 'ui.bootstrap', 'ionic']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// Fix when $uibModalInstance is use in a non-modal controller
app.service('$uibModalInstance', function () {});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
