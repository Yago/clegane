'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    messages    = require('../../config/messages.json');

/*
 * Display tv page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 * Season and Episodes data will be get by AngularJS in front
 */
exports.display = function(req, res) {
  var userId = req.body.userId,
      tvId = req.params.id;

  // Request main tv informations
  apiCtrl.get('/tv/'+tvId,
    function (main) {

      // Request credits
      apiCtrl.get('/tv/'+tvId+'/credits',
        function (credits) {

          // Request videos
          apiCtrl.get('/tv/'+tvId+'/videos',
            function (videos) {

              // Request similars
              apiCtrl.get('/tv/'+tvId+'/similar',
                function (similar) {

                  // Request imdb id
                  apiCtrl.get('/tv/'+tvId+'/external_ids',
                    function (ids) {
                      res.locals.tv = main;
                      res.locals.credits = credits;
                      res.locals.videos = videos.results;
                      res.locals.similar = similar.results;
                      res.locals.ids = ids;
                      res.render('tv');
                    }, function (err) {
                      res.locals.tv = main;
                      res.locals.credits = credits;
                      res.locals.videos = videos.results;
                      res.locals.similar = similar.results;
                      res.render('tv');
                    });

                }, function (err) {
                  res.locals.tv = main;
                  res.locals.credits = credits;
                  res.locals.videos = videos.results;
                  res.render('tv');
                });

            }, function (err) {
              res.locals.tv = main;
              res.locals.credits = credits;
              res.render('tv');
            });

        }, function (err) {
          res.locals.tv = main;
          res.render('tv');
        });

    }, function (err) {
      res.send('The tv show couldn\'t be found');
    });
};

/*
 * Add a show to User
 * Params: key, name, imdb_id
 */
exports.add = function(req, res) {
  var userId  = req.body.userId;

  User.findOne({_id:userId, 'tvs.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}

      // Check if show already exist in User
      if (!user) {

        // Add show
        User.findOneAndUpdate({_id:userId},
          {
            $push : {
              tvs : {
                name: req.body.name,
                tmdb_id: req.params.id,
                imdb_id: req.body.imdb_id
              }
            }
          }, function (err, user) {
            if (err) {return res.send(messages.errors.default_error);}
            if (!user) {return res.send(messages.errors.user_notfound);}
            res.send(messages.success.tv_added);
          });
      } else {
        res.send(messages.errors.tv_exist);
      }
    });
};

/*
 * Remove a show from User
 * Params: key
 */
exports.remove = function(req, res) {
  var userId = req.body.userId;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          tvs : {
            tmdb_id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {return res.send(messages.errors.default_error);}
        if (!user) {return res.send(messages.errors.user_notfound);}
        res.send(messages.success.tv_removed);
      });

};

/*
 * List User's TV shows
 * Params: key
 */
exports.list = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}
      if (!user) {return res.send(messages.errors.user_notfound);}
      res.send(user.tvs);
    });
};
