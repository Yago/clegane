'use strict';

/* global angular */

var app = angular.module('CleganeApp',
            ['ngSanitize', 'ngTouch', 'ui.bootstrap', 'ionic', 'ion-autocomplete']);


// Basic angular style middleware
app.run(function ($rootScope, $state, $location) {
  $rootScope.isAuthenticated = false;
  $rootScope.isMenu = 'never';
  if (localStorage.cleganeToken || sessionStorage.cleganeToken) {
    $rootScope.isAuthenticated = true;
    $rootScope.isMenu = 'large';
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireAuth = toState.requireAuth;
    if (requireAuth) {
      if (!$rootScope.isAuthenticated) {
        event.preventDefault();
        $state.go('app.homepage');
      }
    } else {
      if ($rootScope.isAuthenticated) {
        event.preventDefault();
        $state.go('app.dashboard');
      }
    }
  });

});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// Ionic config
app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.transition('none');
});

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
