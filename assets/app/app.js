'use strict';

/* global angular */

var app = angular.module('CleganeApp',
            ['ngSanitize', 'ui.bootstrap']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
