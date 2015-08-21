'use strict';

require('dotenv').load();

module.exports = {
  debug: true,
  db: process.env.MONGO_URL,
  tmdb: process.env.TMDB_API_KEY,
  secret: process.env.SECRET
};
