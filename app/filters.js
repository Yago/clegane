'use strict';

/*
 * Return player's rank based on player.id and user object
 */
exports.rank = function (playerId, user) {
  var rank = '';
  user.players.sort(function(a, b){
    return b.points-a.points;
  });
  user.players.sort(function(a, b){
    return b.status-a.status;
  });
  for (var i = 0; i < user.players.length; i++) {
    if (user.players[i].id === playerId) {
      rank = i + 1;
    }
  }
  return rank;
};

/*
 * Return player's name based on player.id and user object
 */
exports.name = function (playerId, user) {
  var name = '';
  user.players.forEach(function(player){
    if (player.id === playerId) {
      name = player.name;
    }
  });
  return name;
};

/*
 * Return player's level based on player.id and user object
 */
exports.level = function (playerId, user) {
  var level = '',
      total = user.players.length,
      unit  = total / 5;
  user.players.sort(function(a, b){
    return b.points-a.points;
  });
  user.players.sort(function(a, b){
    return b.status-a.status;
  });
  for (var i = 0; i < user.players.length; i++) {
    if (user.players[i].id === playerId) {

      if (total - (i+1) >= unit * 4) {
        level = 'master';
      } else if (total - (i+1) >= unit * 3 && total - (i+1) < unit * 4) {
        level = 'expert';
      } else if (total - (i+1) >= unit * 2 && total - (i+1) < unit * 3) {
        level = 'adept';
      } else if (total - (i+1) >= unit * 1 && total - (i+1) < unit * 2) {
        level = 'apprentice';
      } else if (total - (i+1) >= unit * 0 && total - (i+1) < unit * 1) {
        level = 'novice';
      }

      if (!user.players[i].status) {
        level = 'novice';
      }
    }
  }
  return level;
};

/*
 * Make modulo operations
 */
exports.modulo = function (input, coef) {
  return (input + 1) % coef;
};

/*
 * Send array length
 */
exports.length = function (input) {
  return input.length;
};
