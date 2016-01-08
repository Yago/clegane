'use strict';

/* global app */

app.controller('DashboardCtrl', function(ApiService) {
  var that = this;

  that.data = '';

  that.token = localStorage.cleganeToken;
  if (!that.token) {
    that.token = sessionStorage.cleganeToken;
  }

  // Get picks and user data
  that.init = function () {
    ApiService.get('LOCAL_API?token='+that.token,
      function (res) {
        if (res.data.success) {
          console.log(res.data.data.picks);
          that.data = res.data.data;
        }
      }, function (err) {
        console.log(err);
      });

  };

});
