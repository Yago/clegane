'use strict';

var User 				= require('../models/user.model'),
    crypto      = require('crypto'),
    algorithm   = 'aes-256-ctr';

var config 				 = require('../../config/config.js');

var createHash = function(password){
  var cipher = crypto.createCipher(algorithm, config.secret),
      crypted = cipher.update(password,'utf8','hex');

  crypted += cipher.final('hex');
  return crypted;
};


/*
 * Check if authenticate when on homepage
 */
exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    next('route');
    return;
  } else {
    res.render('homepage');
  }
};

/*
 * Create new User
 */
exports.create = function (req, res) {
  var newUser = new User();
      newUser.username = req.body.username;
      newUser.password = createHash(req.body.password);
      newUser.email = req.body.email;
      newUser.country = req.body.country;
      newUser.save(function(err) {
        if (err){
          req.flash('error', 'Error in Saving user:  ' + err);
          return err;
        }
        res.redirect('/signup/completed');
      });
};

/*
 * Signup completed page
 */
exports.signupCompleted = function(req, res) {
  res.render('user/signup-completed');
};

/*
 * API page
 */
exports.api = function(req, res) {
  res.render('api');
};

/*
 * List all User
 */
exports.list = function(req, res) {
  User.find({}, function(err, users) {
    var list = [];
    users.forEach(function(user) {
      list.push(user.username);
    });
    res.json(list);
  });
};

/*
 * Render login page
 */
exports.login = function(req, res) {
  res.render('user/login');
};

/*
 * Render settings page
 */
exports.settings = function(req, res) {
  res.render('user/settings');
};

/*
 * Save settings
 */
exports.update = function(req, res) {
  var userId = req.body.userId;

  console.log(req.body.password.length);

  if (typeof req.body.password === 'undefined' || req.body.password.length < 1) {
    User.findOneAndUpdate({_id:userId},
    {
      $set : {
        'username': req.body.username,
        'email': req.body.email
      }
    }, function (err, user, next) {
      if (err) {return next(err);}
      if (!user) {return res.send('Epic fail');}
      if (typeof req.body.inapp !== 'undefined') {
        req.flash('success', 'Profile successfully updated');
        res.redirect('/settings');
      } else {
        res.send('Profile successfully updated');
      }
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
      if (err) {return next(err);}
      if (!user) {return res.send('Epic fail');}
      if (typeof req.body.inapp !== 'undefined') {
        req.flash('success', 'Profile successfully updated');
        res.redirect('/settings');
      } else {
        res.send('Profile successfully updated');
      }
    });
  }
};

/*
 * Render dashboard page
 */
exports.dashboard = function(req, res) {
  res.render('dashboard');
};

/*
 * Render signup page
 */
exports.signup = function(req, res) {
  res.render('user/signup');
};
