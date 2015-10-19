'use strict';

var User        = require('../models/user.model'),
    apiCtrl     = require('./api.ctrl.js'),
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
      if (err) {return res.send(messages.errors.default_error);}
      if (!user) {return res.send(messages.errors.user_notfound);}
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
      if (err) {return res.send(messages.errors.default_error);}
      if (!user) {return res.send(messages.errors.user_notfound);}
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
  User.findOne({_id:userId, 'lists._id': req.params.id, 'lists.items.item': req.params.item},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}
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
            if (err) {return res.send(messages.errors.default_error);}
            if (!user) {return res.send(messages.errors.user_notfound);}
            res.send(messages.success.list_item_added);
          });
      } else {
        return res.send(messages.errors.list_exist);
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
  User.findOne({_id:userId, 'lists._id': req.params.id, 'lists.items.item': req.params.item},
    function (err, user) {
      if (err) {return res.send(messages.errors.default_error);}
      // Check if item exist in list
      if (!user) {
        return res.send(messages.errors.list_notexist);
      } else {
        User.findOneAndUpdate({_id:userId, 'lists._id': req.params.id, 'lists.items.item': req.params.item},
          {
            $pull : {
              'lists.$.items' : {
                item: req.params.item
              }
            }
          }, function (err, user) {
            if (err) {return res.send(messages.errors.default_error);}
            if (!user) {return res.send(messages.errors.user_notfound);}
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
        if (err) {return res.send(messages.errors.default_error);}
        if (!user) {return res.send(messages.errors.user_notfound);}
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
      if (err) {return res.send(messages.errors.default_error);}
      if (!user) {return res.send(messages.errors.user_notfound);}
      res.send(user.lists);
    });
};
