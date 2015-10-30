'use strict';

/* global app */

app.controller('ModalCtrl', function($scope, $http, $uibModal) {
  var that = this;

  that.open = function () {
    var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'modal-list.html',
          controller: 'ListCtrl as modal'
        });
  };

});
