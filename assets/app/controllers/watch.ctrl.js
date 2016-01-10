'use strict';

/* global app */

app.controller('WatchCtrl', function(ApiService, $stateParams) {
  var that = this;

  that.watched = false;
  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  that.init = function () {
    var state = true,
        url = 'LOCAL_API/movies',
        data = {
          token: that.token
        };

    ApiService.post(url, data, function (res) {
      //console.log(res);
      if (res.data.success) {
        res.data.data.forEach(function(movie){
          if (movie.tmdb_id === $stateParams.id && movie.watched) {
            that.watched = true;
          }
        });
      }
    }, function (err) {
      //console.log(err);
    });
  };

  that.movie = function (id, title, picture, imdb) {
    var state = true,
        url = 'LOCAL_API/movie/'+ id +'/watch',
        data = {
          token: that.token,
          name: title,
          picture: picture,
          imdb_id: imdb,
          watch: state
        };

    if (that.watched) {
      data.watch = false;
    }

    ApiService.post(url, data, function (res) {
      console.log(res);
      if (that.watched) {
        that.watched = false;
      } else {
        that.watched = true;
      }
    }, function (err) {
      console.log(err);
    });
  };

  that.episode = function (id, title, picture, season, episode, episodeId, episodeTitle, imdb) {
    var url = 'LOCAL_API/tv/'+ id +'/watch/'+episodeId,
        data = {
          token: that.token,
          name: title,
          picture: picture,
          imdb_id: imdb,
          season: season,
          episode: episode,
          title: episodeTitle
        };

    ApiService.post(url, data, function (res) {
      console.log(res);
    }, function (err) {
      console.log(err);
    });
  };


});
