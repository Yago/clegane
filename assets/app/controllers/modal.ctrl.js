'use strict';

/* global app */

app.controller('ModalCtrl', function($scope, $ionicModal) {
  var that = this;

  $ionicModal.fromTemplateUrl('templates/components/molecules/modal-list.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    that.modal = modal;
    //that.modal.show();
  });

  that.open = function () {
    that.modal.show();
  };

  that.close = function () {
    that.modal.hide();
  };

  // that.search = function () {
  //   var modalInstance = $uibModal.open({
  //         animation: true,
  //         templateUrl: 'modal-search',
  //         controller: 'SearchCtrl as search'
  //       });
  // };

});
