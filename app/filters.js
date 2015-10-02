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
 * Return Firesize url
 */
exports.firesize = function (ratio, width) {
  var height = Math.round(parseFloat(width)/parseFloat(ratio));

  /* Firesize */
  //return 'https://'+config.firesize+'.firesize.com/'+width+'x'+height+'/g_';
  //return 'https://firesize.com/'+width+'x'+height+'/g_';

  /* Imageshack */
  return 'http://imagizer.imageshack.us/'+width+'x'+height;
};

/*
 * Return year from date
 */
exports.year = function (date) {
  return date.split('-')[0];
};

