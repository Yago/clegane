'use strict';

var config = require('./../config/config.js');

/*
 * Return player's rank based on player.id and user object
 */
exports.recent = function (movies) {
  movies.sort(function(a, b){
    return b.year-a.year;
  });
  return movies;
};

/*
 * Return season sorted
 */
exports.sortSeasons = function (seasons) {
  seasons.sort(function(a, b){
    return a.season_number-b.season_number;
  });
  return seasons;
};

/*
 * Return item sorted by name
 */
exports.sortNames = function (items) {
  items.sort(function(a, b){
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });
  return items;
};

/*
 * Return previous page
 */
exports.previous = function (current) {
  if (current === 1) {
    return 1;
  } else {
    return current - 1;
  }
};

/*
 * Return next page
 */
exports.next = function (current, total) {
  if (current === total) {
    return total;
  } else {
    return current + 1;
  }
};

/*
 * Return an array from a number
 */
exports.numberArray = function (number) {
  var array = [];
  for (var i = 1; i <= number; i++) {
    array.push(i);
  }
  return array;
};

/*
 * Return an array from a number for pagination
 */
exports.paginationArray = function (total, current) {
  var array = [];
  for (var i = current - 5; i <= current + 5; i++) {
    if (i >= 1 && i <= total) {
      array.push(i);
    }
  }
  return array;
};


/*
 * Return resized image url
 */
exports.resize = function (image, width, ratio, gravity) {
  var height  = Math.round(parseFloat(width)/parseFloat(ratio)),
      baseUrl = image.replace('https', 'http').replace('.tmdb.org', '.tmdb.org.rsz.io').replace('.imgur.com', '.imgur.com.rsz.io');

  /* Firesize */
  //return 'https://'+config.firesize+'.firesize.com/'+width+'x'+height+'/g_';
  //return 'https://firesize.com/'+width+'x'+height+'/'+image;

  /* Imageshack */
  //return 'http://imagizer.imageshack.us/'+width+'x'+height+'/'+image;

  /* rsz.io */
  if (width <= 1600 && height <= 1600) {
    return baseUrl+'?width='+width+'&height='+height+'&mode=crop&anchor='+gravity;
  } else {
    return image;
  }


};

/*
 * Return year from date
 */
exports.year = function (date) {
  return date.split('-')[0];
};

/*
 * Return zero from episode/season number
 */
exports.zero = function (number) {
  if (number < 10) {
    return '0'+number;
  } else {
    return number;
  }
};

/*
 * Return array length
 */
exports.length = function (array) {
  return array.length;
};

/*
 * Fix quote break with angular parameters
 */
exports.quotesafe = function (input) {
  return input.replace(/\'/g, "\\'").replace(/\"/g, '\\"');
};

