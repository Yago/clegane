'use strict';

/* global app */

app.controller('ListCtrl', function($uibModalInstance, ApiService) {
  var that = this;

  that.key = '';
  that.lists = [];
  that.mediaId = '';
  that.mediaTitle = '';
  that.mediaType = '';
  that.mediaPicture = '';
  that.mediaImdb = '';

  /*
   * Init modal with informations send from the dom
   */
  that.init = function (key, mediaId, mediaTitle, mediaType, mediaPicture, mediaImdb) {

    // Get user's lists
    ApiService.post('/lists', {key: key}, function (res) {
        that.key = key;
        that.mediaId = mediaId;
        that.mediaTitle = mediaTitle;
        that.mediaType = mediaType;
        that.mediaPicture = mediaPicture;
        that.mediaImdb = mediaImdb;

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
        //console.log(err);
      });
  };

  /*
   * Push or pull item in a list
   */
  that.update = function (id, notexist) {

    if (!notexist) {
      // pull item in list
      ApiService.post('/list/'+id+'/pull/'+that.mediaId, {key: that.key},
        function (res) {
          //console.log(res);
        }, function (err) {
          //console.log(err);
        });
    } else {
      // Check if media exist to user
      ApiService.post('/'+that.mediaType+'s', {key: that.key},
        function (res) {
          //console.log(res);
          var i = 0;

          // If there is something in the [TYPE] user's listing
          if (res.data.length > 0) {
            res.data.forEach(function(item){
              i++;

              // check if media exist in user, then push it
              if (item.tmdb_id === that.mediaId) {
                // push item to list
                ApiService.post('/list/'+id+'/push/'+that.mediaId, {key: that.key},
                  function (res) {
                    //console.log(res);
                  }, function (err) {
                    //console.log(err);
                  });
              }

              // Otherwise add media to user and push it
              if (i === res.data.length) {
                ApiService.post('/'+that.mediaType+'/'+that.mediaId+'/add',
                  {
                    key: that.key,
                    name: that.mediaTitle,
                    picture: that.mediaPicture,
                    imdb_id: that.mediaImdb
                  },
                  function (res) {
                    ApiService.post('/list/'+id+'/push/'+that.mediaId, {key: that.key},
                      function (res) {
                        //console.log(res);
                      }, function (err) {
                        //console.log(err);
                      });
                  }, function (err) {
                    //console.log(err);
                  });
              }
            });
          } else {
            ApiService.post('/'+that.mediaType+'/'+that.mediaId+'/add',
              {
                key: that.key,
                name: that.mediaTitle,
                picture: that.mediaPicture,
                imdb_id: that.mediaImdb
              },
              function (res) {
                ApiService.post('/list/'+id+'/push/'+that.mediaId, {key: that.key},
                  function (res) {
                    //console.log(res);
                  }, function (err) {
                    //console.log(err);
                  });
              }, function (err) {
                //console.log(err);
              });
          }

        }, function (err) {
          //console.log(err);
        });
    }

  };

  /*
   * Add new list
   */
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

  /*
   * Close modal
   */
  that.close = function () {
    $uibModalInstance.close();
  };

  /*
   * Cancel modal (not use currently)
   */
  that.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
