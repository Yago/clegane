'use strict';

require('dotenv').load();

module.exports = {
  local: 'http://localhost:3000/api',
  url: 'http://api.themoviedb.org/3',
  key: process.env.TMDB_API_KEY,
  lang: 'en',
  images: 'https://image.tmdb.org/t/p/original'
};
