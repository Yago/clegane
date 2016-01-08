'use strict';

/* global app */

app.controller('PageCtrl', function(ApiService, $stateParams) {
  var that = this;

  that.data = '';
  that.param = $stateParams;

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  // Get picks and user data
  that.get = function (call) {
    ApiService.get('LOCAL_API'+call+'?token='+that.token,
      function (res) {
        if (res.data.success) {
          that.data = res.data.data;
        }
      }, function (err) {
        console.log(err);
      });

  };

});
