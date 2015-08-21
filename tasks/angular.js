'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    nodeconfig    = require('../config/config.js'),
    argv          = require('yargs').argv;

module.exports = function() {

  /**
   * Build JS
   * With error reporting on compiling (so that there's no crash)
   * And jshint check to highlight errors as we go.
   */
  gulp.task('angular', function() {
    return gulp.src([config.assets + 'app/**/*.js'])
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.ngAnnotate())
      .pipe($.replace('API_KEY_HERE', nodeconfig.tmdb))
      .pipe($.concat('angular-app.js'))
      .pipe($.if(argv.production, $.uglify()))
      .pipe($.size({title: 'JS SCRIPTS', showFiles: true}))
      .pipe(gulp.dest(config.build + 'js'));
  });

};
