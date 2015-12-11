'use strict';

var User          = require('../models/user.model'),
    apiCtrl       = require('./api.ctrl.js'),
    messages      = require('../../config/messages.json'),
    async         = require('async'),
    seasonsObject = function (userId, tv, done){
      var seasons = [];
      async.each(tv.seasons, function(season, seasonCallback) {
        apiCtrl.get('/tv/'+tv.id+'/season/'+season.season_number,
          function (data) {
            var seasonArray = data;
            async.each(seasonArray.episodes, function(episode, episodeCallback) {
              User.findOne({_id:userId, 'tvs.tmdb_id': tv.id, 'tvs.episodes.tmdb_id': episode.id},
                function (err, user) {
                  if (err) {
                    episode.watched = false;
                    episodeCallback();
                  }
                  if (!user) {
                    episode.watched = false;
                    episodeCallback();
                  }
                  else {
                    episode.watched = true;
                    episodeCallback();
                  }
                });
            }, function(err){
                if( err ) {
                  // console.log(err);
                } else {
                  seasons.push(seasonArray);
                  seasonCallback();
                }
            });
          }, function (err) {
            //console.log(err);
          });
      }, function(err){
          if( err ) {
            // console.log(err);
          } else {
            done(seasons);
          }
      });
    };

/*
 * Display tv page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 * Season and Episodes data will be get by AngularJS in front
 */
exports.display = function(req, res) {
  var userId = req.decoded.id,
      tvId = req.params.id;

  var data = {};

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
                      seasonsObject(userId, main, function(seasons){
                        data.tv = main;
                        data.credits = credits;
                        data.videos = videos.results;
                        data.similar = similar.results;
                        data.ids = ids;
                        data.seasons = seasons;
                        res.json({
                          success: true,
                          data: data
                        });
                      });
                    }, function (err) {
                      seasonsObject(userId, main, function(seasons){
                        data.tv = main;
                        data.credits = credits;
                        data.videos = videos.results;
                        data.similar = similar.results;
                        data.seasons = seasons;
                        res.json({
                          success: true,
                          data: data
                        });
                      });
                    });

                }, function (err) {
                  seasonsObject(userId, main, function(seasons){
                    data.tv = main;
                    data.credits = credits;
                    data.videos = videos.results;
                    data.seasons = seasons;
                    res.json({
                      success: true,
                      data: data
                    });
                  });
                });

            }, function (err) {
              seasonsObject(userId, main, function(seasons){
                data.tv = main;
                data.credits = credits;
                data.seasons = seasons;
                res.json({
                  success: true,
                  data: data
                });
              });
            });

        }, function (err) {
          seasonsObject(userId, main, function(seasons){
            data.tv = main;
            data.seasons = seasons;
            res.json({
              success: true,
              data: data
            });
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
 * Display discover tv page
 * Get data set one by one and if one fail, render the page with the well retrieved data.
 */
exports.discover = function(req, res) {
  var userId = req.decoded.id,
      list = req.params.list,
      page = req.params.page;

  var data = {};

  // Request main movie informations
  apiCtrl.discover('tv', list, page,
    function (main) {

      data.type = 'tvs';
      data.query = list;
      data.data = main;
      data.lists = ['popular', 'airing_today', 'on_the_air'];
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
 * Add a show to User
 * Params: key, name, picture, imdb_id
 */
exports.add = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId, 'tvs.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}

      // Check if show already exist in User
      if (!user) {

        // Add show
        User.findOneAndUpdate({_id:userId},
          {
            $push : {
              tvs : {
                name: req.body.name,
                tmdb_id: req.params.id,
                imdb_id: req.body.imdb_id,
                picture: req.body.picture
              }
            }
          }, function (err, user) {
            if (err) {res.json({success: false, message: messages.errors.default_error});}
            if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
            // check if it's not a watch request
            if (!req.body.season) {
              res.json({
                success: true,
                message: messages.success.tv_added
              });
            }
          });
      } else {
        res.json({
          success: false,
          message: messages.errors.tv_exist
        });
      }
    });
};

/*
 * Toggle watch episode
 * Params: key, name, imdb_id, season, episode
 */
exports.watch = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId, 'tvs.tmdb_id': req.params.id},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      // If TV Show already exist in User, then add it
      if (!user) {
        module.exports.add(req, res);
      }
      User.findOne({_id:userId, 'tvs.tmdb_id': req.params.id, 'tvs.episodes.tmdb_id': req.params.episode},
        function (err, user) {
          if (err) {res.json({success: false, message: messages.errors.default_error});}
          // If episode not exist in the show, then add it
          if (!user) {
            User.findOneAndUpdate({_id:userId, 'tvs.tmdb_id': req.params.id},
              {
                $push : {
                  'tvs.$.episodes' : {
                    tmdb_id: req.params.episode,
                    season: req.body.season,
                    title: req.body.title,
                    episode: req.body.episode
                  }
                },
                $set : {
                  'tvs.$.last_view': Date.now()
                }
              }, function (err, user) {
                if (err) {res.json({success: false, message: messages.errors.default_error});}
                if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
                res.json({
                  success: true,
                  message: messages.success.tv_watched
                });
              });
          // If episode exist, then drop it
          } else {
            User.findOneAndUpdate({_id:userId, 'tvs.tmdb_id': req.params.id, 'tvs.episodes.tmdb_id': req.params.episode},
              {
                $pull : {
                  'tvs.$.episodes' : {
                    tmdb_id: req.params.episode
                  }
                }
              }, function (err, user) {
                if (err) {res.json({success: false, message: messages.errors.default_error});}
                if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
                res.json({
                  success: true,
                  message: messages.success.tv_notwatched
                });
              });
          }
        });
    });

};

/*
 * Remove a show from User
 * Params: key
 */
exports.remove = function(req, res) {
  var userId = req.decoded.id;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          tvs : {
            tmdb_id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {res.json({success: false, message: messages.errors.default_error});}
        if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
        res.json({
          success: true,
          message: messages.success.tv_removed
        });
      });

};

/*
 * List User's TV shows
 * Params: key
 */
exports.list = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      res.json({
        success: true,
        data: user.tvs
      });
    });
};
