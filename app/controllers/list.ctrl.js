'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    async       = require('async'),
    messages    = require('../../config/messages.json');

/*
 * Add a list to User
 * Params: token, name
 */
exports.add = function(req, res) {
  var userId = req.decoded.id;

  // Add movie
  User.findOneAndUpdate({_id:userId},
    {
      $push : {
        lists : {
          name: req.body.name
        }
      }
    }, function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      res.json({
        success: true,
        message: messages.success.list_added
      });
    });
};

/*
 * Show list
 * Params: token
 */
exports.show = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId, 'lists._id': req.params.id},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}
      user.lists.forEach(function(list){
        if (list._id == req.params.id) {
          res.json({
            success: true,
            data: list
          });
        }
      });
    });
};

/*
 * Add item to list
 * Params: token
 */
exports.push = function(req, res) {
  var userId = req.decoded.id;

  // Add movie
  User.findOne({_id:userId, 'lists._id': req.params.id, 'lists.$.items.item': req.params.item},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      // Check if item not already exist in list
      if (!user) {
        User.findOneAndUpdate({_id:userId, 'lists._id': req.params.id},
          {
            $push : {
              'lists.$.items' : {
                item: req.params.item
              }
            }
          }, function (err, user) {
            if (err) {
              res.json({
                success: false,
                message: messages.errors.default_error
              })
            }
            if (!user) {
              res.json({
                success: false,
                message: messages.errors.user_notfound
              })
            }
            res.json({
              success: true,
              message: messages.success.list_item_added
            });
          });
      } else {
        res.json({
          success: false,
          message: messages.errors.list_exist
        })
      }
    });
};

/*
 * Remove item to list
 * Params: token
 */
exports.pull = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId, 'lists._id': req.params.id},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}

      User.findOneAndUpdate({_id:userId, 'lists._id': req.params.id},
        {
          $pull : {
            'lists.$.items' : {
              item: req.params.item
            }
          }
        }, function (err, user) {
          if (err) {res.json({success: false, message: messages.errors.default_error});}
          if (!user) {res.json({success: false,message: messages.errors.user_notfound});}

          res.json({
            success: true,
            message: messages.success.list_item_removed
          });
        });
    });
};

/*
 * Remove a list from User
 * Params: token
 */
exports.remove = function(req, res) {
  var userId = req.decoded.id;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          lists : {
            _id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {res.json({success: false, message: messages.errors.default_error});}
        if (!user) {res.json({success: false,message: messages.errors.user_notfound});}

        res.json({
          success: true,
          message: messages.success.list_removed
        });
      });

};

/*
 * List User's lists
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
        data: user.lists
      });
    });
};

/*
 * Send User's lists items
 */
exports.lists = function(req, res) {
  var userId = req.decoded.id;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {res.json({success: false, message: messages.errors.default_error});}
      if (!user) {res.json({success: false,message: messages.errors.user_notfound});}

      var listsArray = [],
          userItems = {},
          looper = function (type, items, callback) {
            async.each(items, function(item, eachCallback) {
                userItems[item.tmdb_id] = {};
                userItems[item.tmdb_id].add_on = '';
                userItems[item.tmdb_id].type = type;
                userItems[item.tmdb_id].data = item;
                eachCallback();
              }, function(err){
                if( err ) {// console.log(err);
                } else {callback(null);}
              });
          };

      // Build userItems object to provide a quicker access to list item data
      async.waterfall([
          function (callback) {looper('movie', user.movies, function(res){callback(res);});},
          function (callback) {looper('tv', user.tvs, function(res){callback(res);});},
          function (callback) {looper('people', user.peoples, function(res){callback(res);});},
      ], function (err, result) {
          if (err) {res.status(500).send(messages.errors.default_error);}

          // Check if it's a single list request (get /list/:id)
          if (req.params.id) {
            console.log('single');
            user.lists.forEach(function(list){
              if (list.id === req.params.id) {
                var listObject = {};
                listObject.name = list.name;
                listObject.id = list.id;
                listObject.items = [];

                // Loop over list items
                async.each(list.items, function(item, eachSubCallback) {
                    // Retrieve item data (movie/tv/people) from userItems based on id (item.item)
                    var itemObject = userItems[item.item];
                    itemObject.add_on = item.add_on;
                    listObject.items.push(itemObject);
                    eachSubCallback();
                  }, function(err){
                    if( err ) {// console.log(err);
                    } else {
                      res.json({
                        success: true,
                        data: listObject
                      });
                    }
                  });
              }
            });
          } else {
            // Loop over User's lists
            async.each(user.lists, function(list, eachCallback) {
                var listObject = {};
                listObject.name = list.name;
                listObject.id = list.id;
                listObject.items = [];

                // Loop over list items
                async.each(list.items, function(item, eachSubCallback) {
                    // Retrieve item data (movie/tv/people) from userItems based on id (item.item)
                    var itemObject = userItems[item.item];
                    itemObject.add_on = item.add_on;
                    listObject.items.push(itemObject);
                    eachSubCallback();
                  }, function(err){
                    if( err ) {// console.log(err);
                    } else {
                      listsArray.push(listObject);
                      eachCallback();
                    }
                  });
              }, function(err){
                if( err ) {// console.log(err);
                } else {
                  res.json({
                    success: true,
                    data: listsArray
                  });
                }
              });
          }

      });// End userItems waterfall

    });
};
