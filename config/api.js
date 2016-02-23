'use strict';

require('dotenv').load();

module.exports = {
  local: process.env.LOCAL_API,
  url: 'http://api.themoviedb.org/3',
  key: process.env.TMDB_API_KEY,
  lang: 'en',
  images: 'https://image.tmdb.org/t/p/original'
};
