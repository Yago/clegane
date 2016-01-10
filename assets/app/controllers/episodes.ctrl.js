'use strict';

/* global app, PhotoSwipe, PhotoSwipeUI_Default */

app.controller('EpisodesCtrl', function($http, ApiService) {
  var that = this;

  that.seasonOpen = [];
  that.episodeOpen = false;

  that.images = [];
  that.gallery = [];

  that.getData = function (id, season, episode) {
    that.number = episode;
    that.seasonnumber = season;

    // Get episode images
    $http.get('http://api.themoviedb.org/3/tv/'+id+'/season/'+season+'/episode/'+episode+'/images', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      that.images = res.data.stills;
      that.gallery = [];
      res.data.stills.forEach(function(image){
        var item = {
          src : 'https://image.tmdb.org/t/p/original'+image.file_path,
          w   : image.width,
          h   : image.height
        };
        that.gallery.push(item);
      });
    });
  };

  that.init = function (season) {
    that.seasonOpen[season] = false;
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
    }, 300);
  };

  that.openGallery = function (index) {
    var pswp = document.querySelector('.pswp'),
        options = {
          index: index,
          bgOpacity: 0.85,
          showHideOpacity: true
        };

    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, that.gallery, options);
    gallery.init();
  };

});
