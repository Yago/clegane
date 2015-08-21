'use strict';

/* global angular */

var app = angular.module('CleganeApp', ['lub-tmdb-api'])
            .value('lubTmdbApiKey','API_KEY_HERE');

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
