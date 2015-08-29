'use strict';

/*
 * Return player's rank based on player.id and user object
 */
exports.recent = function (movies) {
  movies.sort(function(a, b){
    return a.release_date-b.release_date;
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
