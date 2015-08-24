'use strict';

/* global app, angular */

app.controller('searchCtrl', function($http) {
  var that = this;

  that.type = 'movie';

  that.formAction = function (keywords) {
    return '/search/' + keywords;
  };

  that.string = function (type) {
    return type.toLowerCase();
  };

  that.onSelect = function ($item, $model, $label) {
    window.location.replace('/' + $item.media_type + '/' + $item.id);
  };

  that.selected = undefined;
  that.getResults = function(value) {
    return $http.get('http://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: 'API_KEY_HERE',
        query: value
      }
    }).then(function(res){
      return res.data.results;
    });
  };


});
