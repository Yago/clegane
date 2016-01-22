'use strict';

/* global app */

app.directive('cleganeItem', function(){
  return {
    restrict: 'E',
    scope: {
      id: '@id',
      img: '@img',
      title: '@title',
      type: '@type',
      time: '@time',
      from: '@from'
    },
    templateUrl: 'templates/components/molecules/list-item.html'
  };
});
