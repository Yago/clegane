'use strict';

/* global app, PhotoSwipe, PhotoSwipeUI_Default */

app.controller('MovieCtrl', function($http, $stateParams) {
  var that = this;

  that.images = [];
  that.gallery = [];

  that.init = function () {
    var id = $stateParams.id;

    // Get movie images
    $http.get('http://api.themoviedb.org/3/movie/'+id+'/images', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      that.images = res.data.backdrops;
      res.data.backdrops.forEach(function(image){
        var item = {
          src : 'https://image.tmdb.org/t/p/original'+image.file_path,
          w   : image.width,
          h   : image.height
        };
        that.gallery.push(item);
      });
    });
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
