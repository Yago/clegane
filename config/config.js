'use strict';

require('dotenv').load();

module.exports = {
  debug: true,
  db: process.env.MONGO_URL,
  secret: process.env.SECRET
};
