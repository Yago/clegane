'use strict';

/* global app */

app.controller('PageCtrl', function(ApiService, StorageService, MobileService, $stateParams) {
  var that = this;

  that.isMobile = MobileService.detect();

  that.data = '';
  that.param = $stateParams;
  that.paginationArray = [];

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  // Create pagination array based on current page and max page
  that.paginate = function (total, current) {
    that.paginationArray = [];

    var start = parseInt(current) - 5,
        end = parseInt(current) + 5;

    for (var i = start; i <= end; i++) {
      if (i >= 1 && i <= total) {
        that.paginationArray.push(i);
      }
    }
  };

  // Get picks and user data
  that.get = function (call) {
    ApiService.get('LOCAL_API'+call+'?token='+that.token,
      function (res) {
        if (res.data.success) {
          that.data = res.data.data;
        }
        if (that.data.data != undefined && that.data.data.total_pages != undefined) {
          that.paginate(that.data.data.total_pages, that.param.page);
        }
      }, function (err) {
        console.log(err);
      });
  };

  // Save data from current page
  that.save = function (key, data) {
    StorageService.save(key, data);
  };

  // Get data for season's page
  that.seasons = function (id) {
    if (StorageService.get(id)) {
      that.data = angular.fromJson(StorageService.get(id));
    } else {
      that.get('/tv/'+id);
    }
  }


});
