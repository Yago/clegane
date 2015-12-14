'use strict';

/* global app */

app.config(function($stateProvider, $urlRouterProvider) {

  if (localStorage.cleganeToken) {
    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainCtrl'
      })
      .state('app.home', {
        url: '/',
        views: {
          'menuContent': {
            templateUrl: 'templates/homepage.html'
          }
        }
      })
      .state('app.test', {
        url: '/test',
        views: {
          'menuContent': {
            templateUrl: 'templates/test.html'
          }
        }
      });
    } else {
      $stateProvider
        .state('app', {
          url: '',
          abstract: true,
          templateUrl: 'templates/menu-public.html',
          controller: 'MainCtrl'
        })
        .state('app.welcome', {
          url: '/',
          views: {
            'menuContent': {
              templateUrl: 'templates/welcome.html'
            }
          }
        });
    }

    $urlRouterProvider.otherwise('/');

});
