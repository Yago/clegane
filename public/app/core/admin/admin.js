'use strict';

angular.module('cleganeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/core/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });