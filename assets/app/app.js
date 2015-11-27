'use strict';

/* global angular */

var app = angular.module('CleganeApp',
            ['ngSanitize', 'ngTouch', 'ui.bootstrap']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

// Fix when $uibModalInstance is use in a non-modal controller
app.service('$uibModalInstance', function () {});
