'use strict';

/* global app, angular */

app.controller('searchCtrl', function($http) {
  var that = this;

  that.results = [];

  that.formAction = function (keywords) {
    return '/search/' + keywords;
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

  that.submit = function () {
    return $http.get('http://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: 'API_KEY_HERE',
        query: this.keywords
      }
    }).then(function(res){
      that.results = res.data.results;
      // res.data.results.forEach(function(result){
      //   that.results += '<li>'+result.title+'</li>';
      // });
    });
  };


});
