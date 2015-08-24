'use strict';

require('dotenv').load();

module.exports = {
  url: 'http://api.themoviedb.org/3',
  key: process.env.TMDB_API_KEY,
  lang: 'en',
};
