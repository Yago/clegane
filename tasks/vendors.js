'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json');

module.exports = function() {

 /*
  * CSS Vendors
  */
  gulp.task('css-vendors', function() {
    return gulp.src(config.vendors.css)
      .pipe($.concat('vendors.min.css'))
      .pipe($.cleanCss())
      .pipe($.size({title: 'CSS VENDORS', showFiles: true}))
      .pipe(gulp.dest(config.build + 'css'));
  });

 /*
  * Fonts Sources
  */
  gulp.task('fonts-vendors', function() {
    return gulp.src(config.vendors.fonts)
      .pipe($.size({title: 'FONTS'}))
      .pipe(gulp.dest(config.build + 'fonts'));
  });

  /*
  * Build vendors dependencies
  */
  gulp.task('vendors', function() {
    return gulp.start('css-vendors', 'fonts-vendors');
  });

};
