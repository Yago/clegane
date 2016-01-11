'use strict';

/* global app */

app.controller('PageCtrl', function(ApiService, $stateParams) {
  var that = this;

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
        if (that.data.data.total_pages) {
          that.paginate(that.data.data.total_pages, that.param.page);
        }
      }, function (err) {
        console.log(err);
      });
  };


});
