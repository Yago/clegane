'use strict';

/* global app */

app.controller('ListCtrl', function($uibModalInstance, ApiService) {
  var that = this;

  that.key = '';
  that.lists = [];
  that.mediaId = '';

  that.init = function (key, mediaId) {

    // Get user's lists
    ApiService.post('/lists', {key: key}, function (res) {
        that.key = key;
        that.mediaId = mediaId;

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
              if (item.item === mediaId) {
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
      }, function (err) {
        console.log(err);
      });
  };

  that.update = function (id, exist) {
    var action = 'push';
    if (!exist) {
      action = 'pull';
    }

    var url = '/list/'+id+'/'+action+'/'+that.mediaId,
        data = {
          key: that.key
        };

    // update item in list, pull or push depends if it exist
    ApiService.post(url, data, function (res) {
        //console.log(res);
      }, function (err) {
        //console.log(err);
      });
  };

  that.add = function () {
    if (that.newlist) {
      var url = '/list/add',
          data = {
            key: that.key,
            name: that.newlist
          };

      // add list
      ApiService.post(url, data, function (res) {
          //console.log(res);
          that.lists = [];
          that.newlist = '';
          that.init(that.key, that.mediaId);
        }, function (err) {
          //console.log(err);
        });
    }
  };

  that.close = function () {
    $uibModalInstance.close();
  };

  that.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
