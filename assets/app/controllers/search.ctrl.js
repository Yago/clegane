'use strict';

/* global app, angular */

app.controller('searchCtrl', function($http) {
  var that = this;

  that.onSelect = function ($item, $model, $label) {
    window.location.replace('/movie/' + $item.id);
  };

  that.selected = undefined;
  that.getLocation = function(value) {
    return $http.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'API_KEY_HERE',
        query: value,
        search_type: 'ngram'
      }
    }).then(function(res){
      return res.data.results;
    });
  };

  that.formAction = function (keywords) {
    return "/search/" + keywords;
  };

});
