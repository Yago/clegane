'use strict';

/* global app */

app.controller('EpisodesCtrl', function($http) {
  var that = this;

  that.seasonOpen = [];
  that.episodeOpen = false;

  that.title = '';
  that.number = 0;
  that.seasonnumber = 0;

  that.getData = function (id, season, episode) {
    $http.get('http://api.themoviedb.org/3/tv/'+id+'/season/'+season+'/episode/'+episode+'?api_key=6d83177ea3e67b870ab80fa72f06cbbd', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      that.title = res.data.name;
      that.number = episode;
      that.seasonnumber = season;
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
    console.log('s'+season+'e'+episode);
    that.episodeOpen = true;
    that.getData(id, season, episode);
  };

});
