'use strict';

/* global app, angular */

app.controller('SearchCtrl', function($http, $uibModalInstance) {
  var that = this,
      filterBarInstance;

  that.results = [];
  that.mobileKeywords = "";


  // Redirect to the right page when clicked/select-entered
  that.redirect = function (item, query) {
    var label = query;
    if (label.length <= 0) {
      label = item.title;
    }
    if (item.id === 'all') {
      window.location.replace('/search/' + label + '/1');
    } else {
      if (item.media_type === 'person') {
        window.location.replace('/people/' + item.id);
      } else {
        window.location.replace('/' + item.media_type + '/' + item.id);
      }
    }
  };

  // On desktop select and enter pushed
  that.onSelect = function ($item, $model, $label) {
    that.redirect($item, $label);
  };

  that.selected = undefined;

  // Get desktop results
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

  // Get mobile results
  that.getMobileResults = function (query) {
    return $http.get('http://api.themoviedb.org/3/search/multi', {
        params: {
          api_key: 'API_KEY_HERE',
          query: query
        }
      }).then(function(res){
        var results = [];
        if (res.data.results.length > 0) {
          results = [{
            "id": "all",
            "title": query,
            "display": "SEE ALL RESULTS"
          }];
        }
        res.data.results.forEach(function(result){
          if (result.original_title) {result.display = result.original_title;}
          if (result.name) {result.display = result.name;}
          if (result.first_air_date) {
            result.first_air_date = ' - ' + result.first_air_date.split('-')[0]
          } else {
            result.first_air_date = '';
          }
          if (result.release_date) {
            result.release_date = ' - ' + result.release_date.split('-')[0]
          } else {
            result.release_date = '';
          }
          results.push(result);
        });
        that.results = results;
        return {items: that.results};
      });
  };

  // When desktop form submited
  that.submit = function () {
    window.location.replace('/search/' + this.keywords+ '/1');
  };

  // When mobile item is clicked
  that.itemsClicked = function (callback) {
    that.redirect(callback.item, that.mobileKeywords);
  };

  // Open mobile search
  that.openSearch = function () {
    var ionAutocompleteElement = document.getElementsByClassName("ion-autocomplete");
    angular.element(ionAutocompleteElement).controller('ionAutocomplete').showModal();
  }


});
