'use strict';

require('dotenv').load();

module.exports = {
  debug: true,
  db: process.env.MONGO_URL,
  secret: process.env.SECRET,
  picks: process.env.CLEGANE_PICKS,
  firesize: process.env.FIRESIZE_KEY
};
