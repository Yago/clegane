'use strict';

/* global app */

app.controller('WatchCtrl', function(ApiService) {
  var that = this;

  that.watched = false;

  that.init = function (watched) {
    if (watched) {
      that.watched = true;
    }
  };

  that.movie = function (key, id, title, picture, imdb) {
    var state = true,
        url = '/movie/'+ id +'/watch',
        data = {
          key: key,
          name: title,
          picture: picture,
          imdb_id: imdb,
          watch: state
        };

    if (that.watched) {
      state = false;
    }

    ApiService.post(url, data, function (res) {
      //console.log(res);
      if (that.watched) {
        that.watched = false;
      } else {
        that.watched = true;
      }
    }, function (err) {
      //console.log(err);
    });
  };

  that.episode = function (key, id, title, picture, season, episode, episodeId, episodeTitle, imdb) {
    var url = '/tv/'+ id +'/watch/'+episodeId,
        data = {
          key: key,
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
