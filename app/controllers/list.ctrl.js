'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
    async       = require('async'),
    messages    = require('../../config/messages.json');

/*
 * Add a list to User
 * Params: key, name
 */
exports.add = function(req, res) {
  var userId = req.body.userId;

  // Add movie
  User.findOneAndUpdate({_id:userId},
    {
      $push : {
        lists : {
          name: req.body.name
        }
      }
    }, function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      if (!user) {return res.status(500).send(messages.errors.user_notfound);}
      res.send(messages.success.list_added);
    });
};

/*
 * Show list
 * Params: key
 */
exports.show = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId, 'lists._id': req.params.id},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      if (!user) {return res.status(500).send(messages.errors.user_notfound);}
      user.lists.forEach(function(list){
        if (list._id == req.params.id) {
          res.send(list);
        }
      });
    });
};

/*
 * Add item to list
 * Params: key
 */
exports.push = function(req, res) {
  var userId = req.body.userId;

  // Add movie
  User.findOne({_id:userId, 'lists._id': req.params.id, 'lists.$.items.item': req.params.item},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
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
            if (err) {return res.status(500).send(messages.errors.default_error);}
            if (!user) {return res.status(500).send(messages.errors.user_notfound);}
            res.send(messages.success.list_item_added);
          });
      } else {
        return res.status(500).send(messages.errors.list_exist);
      }
    });
};

/*
 * Remove item to list
 * Params: key
 */
exports.pull = function(req, res) {
  var userId = req.body.userId;

  // Add movie
  User.findOne({_id:userId, 'lists._id': req.params.id},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      // Check if item exist in list
      if (!user) {
        return res.status(500).send(messages.errors.list_notexist);
      } else {
        User.findOneAndUpdate({_id:userId, 'lists._id': req.params.id},
          {
            $pull : {
              'lists.$.items' : {
                item: req.params.item
              }
            }
          }, function (err, user) {
            if (err) {return res.status(500).send(messages.errors.default_error);}
            if (!user) {return res.status(500).send(messages.errors.user_notfound);}
            res.send(messages.success.list_item_removed);
          });
      }
    });
};

/*
 * Remove a People from User
 * Params: key
 */
exports.remove = function(req, res) {
  var userId = req.body.userId;

  User.findOneAndUpdate({_id:userId},
      {
        $pull : {
          lists : {
            _id: req.params.id
          }
        }
      }, function (err, user) {
        if (err) {return res.status(500).send(messages.errors.default_error);}
        if (!user) {return res.status(500).send(messages.errors.user_notfound);}
        res.send(messages.success.list_removed);
      });

};

/*
 * List User's lists
 * Params: key
 */
exports.list = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      if (!user) {return res.status(500).send(messages.errors.user_notfound);}
      res.send(user.lists);
    });
};

/*
 * Send User's lists items
 */
exports.lists = function(req, res) {
  var userId = req.body.userId;

  User.findOne({_id:userId},
    function (err, user) {
      if (err) {return res.status(500).send(messages.errors.default_error);}
      if (!user) {return res.status(500).send(messages.errors.user_error);}

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
                res.locals.lists = listsArray;
                res.render('lists');
              }
            });

      });// End userItems waterfall

    });
};
