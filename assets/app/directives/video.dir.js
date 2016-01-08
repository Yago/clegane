'use strict';

/* global app */

app.directive('cleganeVideosds', function(){
  return {
    restrict: 'E',
    scope: {
      code: '@code'
    },
    templateUrl: 'templates/components/atoms/video.html'
  };
});

app.directive('cleganeVideo', function($sce) {
  return {
    restrict: 'E',
    scope: { code:'=' },
    replace: true,
    template: '<iframe src="{{url}}" class="embed-responsive-item" frameborder="0" allowfullscreen</iframe>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
           }
        });
    }
  };
});