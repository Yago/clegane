'use strict';

/* global app */

app.config(function($stateProvider, $urlRouterProvider, $rootScopeProvider) {

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })
    .state('app.homepage', {
      url: '/',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/homepage.html'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html'
        }
      }
    })
    .state('app.test', {
      url: '/test',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/test.html'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
