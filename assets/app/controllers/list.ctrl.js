'use strict';

/* global app */

app.controller('ListCtrl', function($http, $scope, $uibModalInstance) {
  var that = this;

  that.key = '';
  that.lists = [];
  that.movieId = '';

  that.init = function (key, movieId) {
    // Get user's lists
    $http({
        method: 'POST',
        url: '/lists',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: {
          key: key
        }
    }).then(function(res) {
      that.key = key;
      that.movieId = movieId;

      // Add list instances to main lists array and check if the current item is inside
      res.data.forEach(function(data){
        var i = 0,
            list = {
              id: data._id,
              name: data.name,
              exist: false
            };

        if (data.items.length > 0) {
          data.items.forEach(function(item){
            i++;
            if (item.item === movieId) {
              list.exist = true;
            }
            if (i === data.items.length) {
              that.lists.push(list);
            }
          });
        } else {
          that.lists.push(list);
        }
      });
    }, function(err) {
      console.log(err);
    });
  };

  that.update = function (id, exist) {
    var action = 'push';

    if (!exist) {
      action = 'pull';
    }

    console.log('/list/'+id+'/'+action+'/'+that.movieId);

    // update item in list, pull or push depends if it exist
    $http({
        method: 'POST',
        url: '/list/'+id+'/'+action+'/'+that.movieId,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: {
          key: that.key
        }
    }).then(function(res) {
      console.log(res);
    }, function(err) {
      console.log(err);
    });

  };

  that.close = function () {
    $uibModalInstance.close();
  };

  that.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
