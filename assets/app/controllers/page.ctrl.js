'use strict';

/* global app */

app.controller('PageCtrl', function(ApiService) {
  var that = this;

  that.data = '';

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  // Get picks and user data
  that.init = function (call) {
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
