'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    argv          = require('yargs').argv,
    browserify    = require('browserify'),
    babelify      = require('babelify'),
    source        = require('vinyl-source-stream'),
    path          = require('path');


module.exports = function() {

  function errorAlert(error){
    if (!argv.production) {
      $.notify.onError({title: 'JS Error', message: 'Check your terminal', sound: 'Sosumi'})(error);
      $.util.log(error.messageFormatted);
    }
    this.emit('end');
  };

  function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    $.notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
  }

  /**
   * Build JS
   * With error reporting on compiling (so that there's no crash)
   * And jshint check to highlight errors as we go.
   */
  gulp.task('scripts', ['scripts-lint'], function() {
    return browserify(
      {
        entries: ['./' + config.assets + 'index.jsx'],
        debug: true
      })
      .transform(babelify.configure({
        presets: ['es2015', 'react']
      }))
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.build));
  });

  /**
   * Lint JS
   */
  gulp.task('scripts-lint', function() {
    return gulp.src(config.assets + '**/*.{js,jsx}')
      .pipe($.plumber({errorHandler: errorAlert}))
      .pipe($.eslint())
      .pipe($.eslint.format());
  });

};
