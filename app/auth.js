'use strict';
var User        = require('./models/user.model'),
    jwt         = require('jsonwebtoken');

var config      = require('../config/config.js'),
    message     = require('../config/messages.json');

exports.authenticate = function(req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
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
    } else if (user) {

      var token = jwt.sign({
        id: user.id,
        name: user.username,
        email: user.email
      }, config.secret, {
        expiresInMinutes: 43200 // expires in 1 month
      });

      res.json({
        success: true,
        token: token
      });
    }
  });
};

exports.isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: message.errors.token_fail
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: message.errors.no_token
    });
  }

};

exports.checkUser = function(req, res, next)  {
  User.findOne({username:req.body.username}, function(err, user) {
    if (err) {
      res.json({
        success: false,
        message: message.errors.default_error
      });
    }
    if (user) {
      res.json({
        success: false,
        message: message.errors.user_exist
      });
    } else {
      User.findOne({email:req.body.email}, function(err, user) {
        if (err) {
          res.json({
            success: false,
            message: message.errors.default_error
          });
        }
        if (user) {
          res.json({
            success: false,
            message: message.errors.email_exist
          });
        } else {
          next();
        }
      });
    }
  });
}
