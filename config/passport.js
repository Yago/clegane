var passport 				= require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    LocalStrategy   = require('passport-local').Strategy,
    User 				    = require('../app/models/user.model'),
    crypto          = require('crypto'),
    algorithm       = 'aes-256-ctr';

var config 				 = require('../config/config.js');

var isValidPassword = function(user, password){
  var decipher = crypto.createDecipher(algorithm, config.secret);
  var dec = decipher.update(user.password,'hex','utf8')
  dec += decipher.final('utf8');
  if (dec === password) {
    return true;
  } else {
    return false;
  }
}

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({passReqToCallback : true},
    function(req, username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          req.flash('error', "Username or password incorrect");
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (isValidPassword(user, password)) {
          return done(null, user);
        } else {
          req.flash('error', "Username or password incorrect");
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    }
  ));

};
