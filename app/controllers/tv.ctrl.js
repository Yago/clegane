'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js');

/*
 * Display tv page
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
