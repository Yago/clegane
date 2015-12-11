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
        'username': req.body.username,
        'email': req.body.email
      }
    }, function (err, user, next) {
      if (err) {
        res.json({
          success: false,
          message: message.errors.default_error
        });
      }
      if (!user) {
        res.json({
          success: false,
          message: message.errors.user_error
        });
      }
      res.json({
        success: true,
        message: message.success.user_updated
      });
    });
  } else {
    User.findOneAndUpdate({_id:userId},
    {
      $set : {
        'username': req.body.username,
        'email': req.body.email,
        'password': createHash(req.body.password)
      }
    }, function (err, user, next) {
      if (err) {
        res.json({
          success: false,
          message: message.errors.default_error
        });
      }
      if (!user) {
        res.json({
          success: false,
          message: message.errors.user_error
        });
      }
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
  var userId = req.body.userId;

  // Request main people informations
    apiCtrl.get('/list/'+config.picks,
      function (main) {

        res.locals.picks = main;
        res.render('dashboard');

      }, function (err) {
        res.send('The people couldn\'t be found');
      });
};
