'use strict';

/* global app */

app.controller('EpisodesCtrl', function($http) {
  var that = this;

  that.seasonOpen = [];
  that.episodeOpen = false;

  that.title = '';
  that.number = 0;
  that.seasonnumber = 0;
  that.air_date = '';
  that.description = '';
  that.images = [];

  that.getData = function (id, season, episode) {
    that.number = episode;
    that.seasonnumber = season;

    // Get base informations
    $http.get('http://api.themoviedb.org/3/tv/'+id+'/season/'+season+'/episode/'+episode+'?api_key=6d83177ea3e67b870ab80fa72f06cbbd', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      that.title = res.data.name;
      that.air_date = res.data.air_date;
      that.description = res.data.overview;
    });

    // Get episode images
    $http.get('http://api.themoviedb.org/3/tv/'+id+'/season/'+season+'/episode/'+episode+'/images?api_key=6d83177ea3e67b870ab80fa72f06cbbd', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      that.images = res.data.stills;
    });
  };

  that.init = function (seasons) {
    for (var i = 0; i <= seasons; i++) {
      that.seasonOpen[i] = false;
    }
    console.log(that.seasonOpen);
  };

  that.selectSeason = function (id, season) {
    if (that.episodeOpen) {
      that.seasonOpen[season] = true;
      that.getData(id, season, 1);
    }
  };

  that.selectEpisode = function (id, season, episode) {
    that.episodeOpen = true;
    setTimeout(function(){
      that.getData(id, season, episode);
    }, 1000);
  };

  that.toggleWatch = function () {
    console.log('toggle');
  };

});
