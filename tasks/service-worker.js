'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    del           = require('del'),
    path          = require('path'),
    swPrecache    = require('sw-precache');

module.exports = function() {

 /**
  * Create service worker script based on build
  */
  gulp.task('service-worker', function(callback) {
    swPrecache.write(path.join(config.build, 'sw.js'), {
      staticFileGlobs: [config.build + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
      stripPrefix: config.build
    }, callback);
  });

};
