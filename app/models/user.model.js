var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  key: {
    type: String,
    required: false,
    unique: false
  },
  peoples: [{
    name: {
      type: String,
      unique: false,
      required: true
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true
    },
    imdb_id: {
      type: String,
      unique: false,
      required: false
    },
    picture: {
      type: String,
      unique: false,
      required: false
    }
  }],
  movies: [{
    name: {
      type: String,
      unique: false,
      required: true
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true
    },
    imdb_id: {
      type: String,
      unique: false,
      required: false
    },
    picture: {
      type: String,
      unique: false,
      required: false
    },
    watched: {
      type: Boolean,
      required: false,
      unique: false,
      default: false
    },
    watched_on: {
      type: Date,
      required: true,
      unique: false
    }
  }],
  tvs: [{
    name: {
      type: String,
      unique: false,
      required: true
    },
    tmdb_id: {
      type: String,
      unique: false,
      required: true
    },
    imdb_id: {
      type: String,
      unique: false,
      required: false
    },
    picture: {
      type: String,
      unique: false,
      required: false
    },
    episodes: [{
      tmdb_id: {
        type: String,
        unique: false,
        required: true
      },
      season: {
        type: Number,
        unique: false,
        required: true
      },
      episode: {
        type: Number,
        unique: false,
        required: true
      },
      title: {
        type: String,
        unique: false,
        required: true
      },
      watched_on: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
      }
    }]
  }],
  lists: [{
    name: {
      type: String,
      unique: false,
      required: true
    },
    items: [{
      item: {
        type: String,
        unique: false,
        required: true
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
