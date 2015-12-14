'use strict';

/* global app */

app.directive('cleganePic', function(){
  return {
    restrict: 'E',
    scope: {
      src: '@src',
      size: '@size',
      ratio: '@ratio',
      gravity: '@gravity',
      class: '@class',
      alt: '@alt'
    },
    templateUrl: 'templates/components/atoms/picture.html'
  };
});
