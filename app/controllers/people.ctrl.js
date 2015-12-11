'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    messages    = require('../../config/messages.json');

/*
 * Add year and heading informations instead of inside template
 */
function addInformations (item) {
  var media = item;

  if (media.media_type === 'movie') {
    if (media.release_date) {
      media.year = parseInt(media.release_date.split('-')[0]);
    } else {
      media.year = 0;
    }
    if (media.title) {
      media.heading = media.title;
    } else {
      media.heading = '-';
    }
  } else {
    if (media.first_air_date) {
      media.year = parseInt(media.first_air_date.split('-')[0]);
    } else {
      media.year = 0;
    }
    if (media.name) {
      media.heading = media.name;
    } else {
      media.heading = '-';
    }
  }

  return media;
}

/*
 * Prepare credits to be sorted
 */
function prepareCredits (credits) {
  var output = {};

  output.cast = [];
  output.crew = [];

  credits.cast.forEach(function(cast){
    output.cast.push(addInformations(cast));
  });

  credits.crew.forEach(function(crew){
    output.crew.push(addInformations(crew));
  });

  return output;
}

/*
 * Display people page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.display = function(req, res) {
  var userId = req.decoded.id,
      peopleId = req.params.id;

  var data = {};

  // Request main people informations
  apiCtrl.get('/person/'+peopleId,
    function (main) {

      // Request cast and crew informations
      apiCtrl.get('/person/'+peopleId+'/combined_credits',
        function (credits) {

          // Request cover images
          apiCtrl.get('/person/'+peopleId+'/tagged_images',
            function (images) {
              data.people = main;
              data.credits = prepareCredits(credits);
              data.images = images.results;
              data.currentyear = new Date().getFullYear();
              res.json({
                success: true,
                data: data
              });
            }, function (err) {
              data.people = main;
              data.credits = prepareCredits(credits);
              data.currentyear = new Date().getFullYear();
              res.json({
                success: true,
                data: data
              });
            });

        }, function (err) {
          data.people = main;
          data.currentyear = new Date().getFullYear();
          res.json({
            success: true,
            data: data
          });
        });

    }, function (err) {
      res.json({
        success: false,
        message: messages.errores.api_error
      });
    });
};

/*
 * Display discover peoples page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.discover = function(req, res) {
  var userId = req.decoded.id,
      list = req.params.list,
      page = req.params.page;

  var data = {};

  // Request main movie informations
  apiCtrl.discover('person', list, page,
    function (main) {

      data.type = 'peoples';
      data.query = list;
      data.data = main;
      res.json({
        success: true,
        data: data
      });

    }, function (err) {
      res.json({
        success: false,
        message: messages.errors.api_error
      });
    });
};

/*
 * Add a People to User
 * Params: token, name, imdb_id, picture
 */
exports.add = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId, 'peoples.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}

      // Check if people already exist in User
      if (!user) {

        // Add movie
        User.findOneAndUpdate({_id:userId},
          {
            $push : {
              peoples : {
                name: req.body.name,
                tmdb_id: req.params.id,
                imdb_id: req.body.imdb_id,
                picture: req.body.picture
              }
            }
          }, function (err, user) {
            if (err) {res.json({success: false, message: messages.errors.default_error});}
            if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
            res.json({
              success: true,
              message: messages.success.people_added
            });
          });
      } else {
        res.json({
          success: false,
          message: messages.errors.people_exist
        });
      }
    });
};

/*
 * Remove a People from User
 * Params: token
 */
exports.remove = function(req, res) {
  var userId = req.decoded.id;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          peoples : {
            tmdb_id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {res.json({success: false, message: messages.errors.default_error});}
        if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
        res.json({
          success: true,
          message: messages.success.people_removed
        });
      });

};

/*
 * List User's peoples
 * Params: token
 */
exports.list = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      res.json({
        success: true,
        data: user.peoples
      });
    });
};
