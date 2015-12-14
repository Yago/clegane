'use strict';

/* global app */

app.config(function($stateProvider, $urlRouterProvider, $rootScopeProvider) {

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MainCtrl'
    })
    .state('app.homepage', {
      url: '/',
      data: {requireAuth: false},
      views: {
        'menuContent': {
          templateUrl: 'templates/homepage.html'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      data: {requireAuth: true},
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html'
        }
      }
    })
    .state('app.test', {
      url: '/test',
      data: {requireAuth: true},
      views: {
        'menuContent': {
          templateUrl: 'templates/test.html'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      data: {requireAuth: false},
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      data: {requireAuth: false},
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
