'use strict';

/* global app */

app.directive('cleganeVideo', function($sce) {
  return {
    restrict: 'E',
    scope: { code:'=' },
    replace: true,
    template: '<iframe src="{{url}}" class="embed-responsive-item" frameborder="0" allowfullscreen></iframe>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
           }
        });
    }
  };
});
