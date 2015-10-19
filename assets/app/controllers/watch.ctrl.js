'use strict';

/* global app */

app.controller('WatchCtrl', function($http) {
  var that = this;

  that.watched = false;

  that.init = function (watched) {
    if (watched) {
      that.watched = true;
    }
  };

  that.toggle = function (key, id, title, imdb) {
    var state = true;
    if (that.watched) {
      state = false;
    }
    console.log(that.watched);

    $http({
        method: 'POST',
        url: '/movie/'+ id +'/watch',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: {
          key: key,
          name: title,
          imdb_id: imdb,
          watch: state
        }
    }).then(function(res) {
      console.log(res);
      if (that.watched) {
        that.watched = false;
      } else {
        that.watched = true;
      }
      console.log(that.watched);
    }, function(err) {
      console.log(err);
    });
  };


});
