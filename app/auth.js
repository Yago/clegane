'use strict';
var User        = require('./models/user.model'),
    jwt         = require('jsonwebtoken');

var config      = require('../config/config.js'),
    message     = require('../config/messages.json');

exports.authenticate = function(req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) { res.status(500).send(message.error.default_error); }
    if (!user) {
      res.status(500).send(message.error.user_error);
    } else if (user) {

      var token = jwt.sign({
        name: user.username,
        email: user.email
      }, config.secret, {
        expiresInMinutes: 10080 // expires in 7 days
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
        res.status(403).send(message.errors.token_fail);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send(message.errors.no_token);
  }

};

exports.checkUser = function(req, res, next)  {
  User.findOne({username:req.body.username}, function(err, user) {
    if (err) return next(err);
    if (user) {
      req.flash('error', "User already exist, please change username or email");
      res.render('user/signup');
    } else {
      next();
    }
  });
}
