'use strict';
var User 				= require('./models/user.model'),
    jwt         = require('jsonwebtoken');

var config 			= require('../config/config.js');

exports.isAuthenticated = function(req, res, next)  {
  if (res.locals.isAuthenticated) {
    req.body.userId = res.locals.user.id;
    next();
  } else {
    res.redirect('/');
  }
}

exports.isApiAuthenticated = function(req, res, next)  {
  var key = req.body.key;

  if (typeof key !== 'undefined') {
    User.findOne({key:key}, function(err, user) {
      if (err) return res.send(err);;
      if (!user) {res.send('No user found with this key');}
      req.body.userId = user.id;
      next();
    });
  } else if (typeof key === 'undefined' && res.locals.isAuthenticated) {
    req.body.userId = res.locals.user.id;
    req.body.inapp = true;
    next();
  } else {
    res.send('Please, provide a key');
  }
}

exports.haveApiKey = function(req, res, next)  {
  if (res.locals.isAuthenticated) {
    if (typeof res.locals.user.key === 'undefined') {
      var userToken = {
        id: res.locals.user._id,
        username: res.locals.user.username,
        email: res.locals.user.email
      };
      User.findOneAndUpdate({_id:res.locals.user._id},
        {
          $set : {
            'key': jwt.sign(userToken, config.secret)
          }
        }, function (err, user) {
          if (err) return err;
          if (!user) return res.send('Epic fail');
          next();
        });
    } else {
      next();
    }
  } else {
    next();
  }
}

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
