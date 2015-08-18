var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  key: {
    type: String,
    required: false,
    unique: false,
  },
  roles: {
    type: Array,
    default: ['ROLE_AUTHENTICATED']
  },
  provider: {
    type: String,
    default: 'local'
  },
});

module.exports = mongoose.model('User', userSchema);
