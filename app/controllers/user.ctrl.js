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
