'use strict';

/* global app, angular */

app.filter('year', function() {
  return function(input) {
    return input.split('-')[0];
  };
});

app.filter('day', function() {
  return function(input) {
    return input.split('T')[0];
  };
});

app.filter('loopbreak', function() {
  return function(input, step) {
    if ((input+1) % (12 / step) === 0) {
      return '</div></div><div class="row"><div class="col-sm-'+step+'">';
    }
  };
});

app.filter('typeaheadid', function() {
  return function(input) {
    var inputs = input.split('-'),
        id = inputs[inputs.length-1];
    return id;
  };
});

app.filter('numberArray', function() {
  return function(input) {
    var array = [],
        max = input/5;
    for (var i = 0; i <= max; i++) {
      array.push(i);
    }
    return array;
  };
});

app.filter('rowArray', function() {
  return function(array, current) {
    var items = [];
    for (var i = 0; i <= array.length; i++) {
      if (i < current * 5 && i >= (current-1) * 5) {
        items.push(array[i]);
      }
    }
    return items;
  };
});

/*
 * Beautify string
 */
 app.filter('beautify', function() {
   return function(input) {
     var output = input.replace(/\_/g, ' ');
     return output.charAt(0).toUpperCase() + output.slice(1);
   };
 });

/*
 * Return resized image url
 */
app.filter('resize', function() {
  return function(image, width, ratio, gravity) {
    if (image) {
      var picture = 'https://image.tmdb.org/t/p/'+width+image;
    } else {
      var picture = 'http://i.imgur.com/FOKzIc4.png';
    }
    return picture;
  };
});

