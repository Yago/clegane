'use strict';

var User        = require('../models/user.model'),
    crypto      = require('crypto'),
    apiCtrl     = require('./api.ctrl.js'),
    algorithm   = 'aes-256-ctr';

var config      = require('../../config/config.js'),
    message     = require('../../config/messages.json');

var createHash = function(password){
  var cipher = crypto.createCipher(algorithm, config.secret),
      crypted = cipher.update(password,'utf8','hex');

  crypted += cipher.final('hex');
  return crypted;
};

/*
 * Create new User
 */
exports.create = function (req, res) {
  var newUser = new User();
      newUser.username = req.body.username;
      newUser.password = createHash(req.body.password);
      newUser.email = req.body.email;
      newUser.save(function(err) {
        if (err){
          res.json({
            success: false,
            message: message.errors.creation_fail
          });
        }
        res.json({
          success: true,
          message: message.success.user_created
        });
      });
};

/*
 * Save settings
 */
exports.update = function(req, res) {
  var userId = req.decoded.id;

  if (typeof req.body.password === 'undefined' || req.body.password.length < 1) {
    User.findOneAndUpdate({_id:userId},
    {
      $set : {
        'email': req.body.email
      }
    }, function (err, user, next) {
      if (err) {res.json({success: false, message: message.errors.default_error});}
      if (!user) {res.json({success: false,message: message.errors.user_notfound});}
      res.json({
        success: true,
        message: message.success.user_updated
      });
    });
  } else if (typeof req.body.email === 'undefined' || req.body.email.length < 1) {
    User.findOneAndUpdate({_id:userId},
    {
      $set : {
        'password': createHash(req.body.password)
      }
    }, function (err, user, next) {
      if (err) {res.json({success: false, message: message.errors.default_error});}
      if (!user) {res.json({success: false,message: message.errors.user_notfound});}
      res.json({
        success: true,
        message: message.success.user_updated
      });
    });
  } else {
    User.findOneAndUpdate({_id:userId},
    {
      $set : {
        'email': req.body.email,
        'password': createHash(req.body.password)
      }
    }, function (err, user, next) {
      if (err) {res.json({success: false, message: message.errors.default_error});}
      if (!user) {res.json({success: false,message: message.errors.user_notfound});}
      res.json({
        success: true,
        message: message.success.user_updated
      });
    });
  }
};

/*
 * Render dashboard page
 */
exports.dashboard = function(req, res) {
  var userId = req.decoded.id;

  // Request main people informations
  apiCtrl.get('/list/'+config.picks,
    function (main) {
      User.findOne({_id:userId,},
        function (err, user) {
          if (err) {res.json({success: false, message: message.errors.default_error});}
          if (!user) {res.json({success: false, message: message.errors.user_notfound});}
          res.json({
            success: true,
            data: {
              picks: main,
              movies: user.movies,
              lists: user.lists,
              tvs: user.tvs
            }
          });
        });
    }, function (err) {
      res.json({
        success: false,
        message: message.error.api_error
      });
    });
};

/*
 * List User's infos
 * Params: token
 */
exports.infos = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      res.json({
        success: true,
        data: {
          username: user.username,
          email: user.email
        }
      });
    });
};
