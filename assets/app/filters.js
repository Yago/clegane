'use strict';

/* global app, angular */

app.filter('year', function() {
  return function(input) {
    return input.split('-')[0];
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

/*
 * Return resized image url
 */
app.filter('resize', function() {
  return function(image, width, ratio, gravity) {
    if (image) {
      var picture = 'https://image.tmdb.org/t/p/original'+image;
    } else {
      var picture = 'http://i.imgur.com/FOKzIc4.png';
    }

    var height  = Math.round(parseFloat(width)/parseFloat(ratio)),
        baseUrl = picture.replace('https', 'http').replace('.tmdb.org', '.tmdb.org.rsz.io').replace('.imgur.com', '.imgur.com.rsz.io');

    if (width <= 1600 && height <= 1600) {
      return baseUrl+'?width='+width+'&height='+height+'&mode=crop&anchor='+gravity;
    } else {
      return picture;
    }
  };
});

