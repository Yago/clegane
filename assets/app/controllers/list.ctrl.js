'use strict';

/* global app */

app.controller('ListCtrl', function($uibModalInstance, ApiService, $stateParams, $scope) {
  var that = this;

  that.lists = [];
  that.mediaId = $stateParams.id;

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  /*
   * Init modal with informations send from the dom
   */
  that.init = function () {
    // Get user's lists
    ApiService.get('LOCAL_API/lists?token='+that.token,
      function (res) {
        if (res.data.success) {
          // Add list instances to main lists array and check if the current item is inside
          res.data.data.forEach(function(data){
            var i = 0,
                list = {
                  id: data.id,
                  name: data.name,
                  exist: false
                };

            if (data.items.length > 0) {
              data.items.forEach(function(item){
                i++;
                if (item.data.tmdb_id === that.mediaId) {
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
        }
      }, function (err) {
        //console.log(err);
      });
  };

  /*
   * Push or pull item in a list
   */
  that.update = function (id, notexist) {
    var page = $scope.page;

    if ($scope.page.data.movie) {
      var mediaType = 'movie',
          mediaTitle = $scope.page.data.movie.title,
          mediaPicture = $scope.page.data.movie.poster_path,
          mediaImdb = $scope.page.data.movie.imdb_id;
    } else if ($scope.page.data.tv) {
      var mediaType = 'tv',
          mediaTitle = $scope.page.data.tv.name,
          mediaPicture = $scope.page.data.tv.poster_path,
          mediaImdb = $scope.page.data.ids.imdb_id;
    } else if ($scope.page.data.people) {
      var mediaType = 'people',
          mediaTitle = $scope.page.data.people.name,
          mediaPicture = $scope.page.data.people.profile_path,
          mediaImdb = $scope.page.data.people.imdb_id;
    }

    if (!notexist) {
      // pull item in list
      ApiService.post('LOCAL_API/list/'+id+'/pull/'+that.mediaId, {token: that.token},
        function (res) {
          //console.log(res);
        }, function (err) {
          //console.log(err);
        });
    } else {
      // Check if media exist to user
      ApiService.post('LOCAL_API/'+mediaType+'s', {token: that.token},
        function (res) {
          //console.log(res);
          var i = 0;

          // If there is something in the [TYPE] user's listing
          if (res.data.data.length > 0) {
            var founded = false;

            res.data.data.forEach(function(item){
              i++;

              // check if media exist in user, then push it
              if (item.tmdb_id === that.mediaId) {
                founded = true;
                // push item to list
                ApiService.post('LOCAL_API/list/'+id+'/push/'+that.mediaId, {token: that.token},
                  function (res) {
                    //console.log(res);
                  }, function (err) {
                    //console.log(err);
                  });
              }

              // Otherwise add media to user and push it
              if (i === res.data.data.length && founded === false) {
                ApiService.post('LOCAL_API/'+mediaType+'/'+that.mediaId+'/add',
                  {
                    token: that.token,
                    name: mediaTitle,
                    picture: mediaPicture,
                    imdb_id: mediaImdb
                  },
                  function (res) {
                    ApiService.post('LOCAL_API/list/'+id+'/push/'+that.mediaId, {token: that.token},
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
            console.log('dont have media');
            ApiService.post('LOCAL_API/'+mediaType+'/'+that.mediaId+'/add',
              {
                token: that.token,
                name: mediaTitle,
                picture: mediaPicture,
                imdb_id: mediaImdb
              },
              function (res) {
                ApiService.post('LOCAL_API/list/'+id+'/push/'+that.mediaId, {token: that.token},
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
      var url = 'LOCAL_API/list/add',
          data = {
            token: that.token,
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
