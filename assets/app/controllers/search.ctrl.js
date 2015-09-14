'use strict';

/* global app, angular */

app.controller('searchCtrl', function($http) {
  var that = this;

  that.results = [];

  that.onSelect = function ($item, $model, $label) {
    if ($item.id === 'all') {
      window.location.replace('/search/' + $label + '/1');
    } else {
      window.location.replace('/' + $item.media_type + '/' + $item.id);
    }
  };

  that.selected = undefined;

  that.getResults = function(value) {
    return $http.get('http://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: 'API_KEY_HERE',
        query: value
      }
    }).then(function(res){
      var results = [];
      if (res.data.results.length > 0) {
        results = [{
          "id": "all",
          "title": "SEE ALL RESULTS",
          "display": that.keywords
        }];
      }
      res.data.results.forEach(function(result){
        if (result.original_title) {result.display = result.original_title;}
        if (result.name) {result.display = result.name;}
        results.push(result);
      });
      return results;
    });
  };

  that.submit = function () {
    window.location.replace('/search/' + this.keywords+ '/1');
  };


});
