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
    .state('app.movie', {
      url: '/movie/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/movie.html'
        }
      }
    })
    .state('app.tv', {
      url: '/tv/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/tv.html'
        }
      }
    })
    .state('app.people', {
      url: '/people/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/people.html'
        }
      }
    })
    .state('app.search', {
      url: '/search/:query/:page',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/all-results.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
