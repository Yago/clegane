'use strict';

/* global app */

app.controller('ModalCtrl', function($scope, $http, $uibModal) {
  var that = this;

  that.open = function () {
    var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'modal-list',
          controller: 'ListCtrl as modal'
        });
  };

  that.search = function () {
    var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'modal-search',
          controller: 'SearchCtrl as search'
        });
  };

});
