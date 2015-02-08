'use strict';

angular.module('cleganeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/core/main/main.html',
        controller: 'MainCtrl'
      });
  });