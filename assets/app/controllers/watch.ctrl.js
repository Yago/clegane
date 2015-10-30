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

  that.toggle = function (key, id, title, imdb) {
    var state = true,
        url = '/movie/'+ id +'/watch',
        data = {
          key: key,
          name: title,
          imdb_id: imdb,
          watch: state
        };

    if (that.watched) {
      state = false;
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


});
