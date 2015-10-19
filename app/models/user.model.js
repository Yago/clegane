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
  peoples: [{
    name: {
      type: String,
      unique: false,
      required: true,
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true,
    },
    imdb_id: {
      type: String,
      unique: false,
      required: true,
    }
  }],
  movies: [{
    name: {
      type: String,
      unique: false,
      required: true,
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true,
    },
    imdb_id: {
      type: String,
      unique: false,
      required: true,
    },
    watched: {
      type: Boolean,
      required: false,
      unique: false,
      default: false
    }
  }],
  tvs: [{
    name: {
      type: String,
      unique: false,
      required: true,
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true,
    },
    imdb_id: {
      type: String,
      unique: false,
      required: true,
    },
    episodes: [{
      tmdb_id: {
        type: String,
        unique: false,
        required: true,
      },
      season: {
        type: Number,
        unique: false,
        required: true,
      },
      episode: {
        type: Number,
        unique: false,
        required: true,
      },
      name: {
        type: String,
        unique: false,
        required: true,
      }
    }]
  }],
  lists: [{
    name: {
      type: String,
      unique: false,
      required: true,
    },
    items: [{
      item: {
        type: String,
        unique: false,
        required: true,
      }
    }],
  }],
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
