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
