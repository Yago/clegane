'use strict';

/* global app, PhotoSwipe, PhotoSwipeUI_Default */

app.controller('PeopleCtrl', function($http, $stateParams) {
  var that = this;

  that.gallery = [];

  that.getData = function () {
    var id = $stateParams.id;

    // Get people's profile pics
    $http.get('http://api.themoviedb.org/3/person/'+id+'/images', {
      params: {
        api_key: 'API_KEY_HERE'
      }
    }).then(function(res){
      var profileIndex = 0;
      res.data.profiles.forEach(function(image){
        var item = {
          src : 'https://image.tmdb.org/t/p/original'+image.file_path,
          w   : image.width,
          h   : image.height,
          file_path : image.file_path,
          vote : image.vote_average
        };
        that.gallery.push(item);
        profileIndex++;
        if (profileIndex === res.data.profiles.length) {

          // Get people's tagged pics
          $http.get('http://api.themoviedb.org/3/person/'+id+'/tagged_images', {
            params: {
              api_key: 'API_KEY_HERE'
            }
          }).then(function(res){
            for (var i = 1; i <= res.data.total_pages; i++) {

              // Get people's tagged pics by results pages
              $http.get('http://api.themoviedb.org/3/person/'+id+'/tagged_images', {
                params: {
                  api_key: 'API_KEY_HERE',
                  page: i
                }
              }).then(function(res){
                res.data.results.forEach(function(image){
                  var title = image.media.title;
                  if (!image.media.title) {
                    title = image.media.name;
                  }
                  var item = {
                    src : 'https://image.tmdb.org/t/p/original'+image.file_path,
                    w   : image.width,
                    h   : image.height,
                    title: '<a href="/'+image.media_type+'/'+image.media.id+'" target="_blank">'+title+'</a>',
                    file_path : image.file_path,
                    vote : image.vote_average
                  };
                  that.gallery.push(item);
                });
              }); //Tagged pics page end

            }
          }); //Tagged pics end
        }
      });
    }); //Profile pics end

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

  that.notFuture = function (item) {
    var currentYear = new Date().getFullYear();
    if (item.year < currentYear) {
      return item;
    } else {
      return 0;
    }
  };

  that.hasPoster = function (item) {
    if (item.poster_path) {
      return item;
    } else {
      return 0;
    }
  };

});
