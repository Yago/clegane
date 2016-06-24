'use strict';
/**
 * Import plugins
 */
var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('./gulp_config.json'),
    runSequence   = require('run-sequence');


require(config.tasks + 'vendors')();            // $ gulp vendors
require(config.tasks + 'images')();             // $ gulp img
require(config.tasks + 'styles')();             // $ gulp styles
require(config.tasks + 'scripts')();            // $ gulp scripts
require(config.tasks + 'favicons')();           // $ gulp favicons
require(config.tasks + 'clean')();              // $ gulp clean
require(config.tasks + 'service-worker')();     // $ gulp service-worker
require(config.tasks + 'server')();             // $ gulp serve
require(config.tasks + 'gh-pages')();           // $ gulp deploy


/**
 * Init project
 */
gulp.task('init', function() {
  return gulp.src('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss')
    .pipe($.rename('bootstrap-variables.scss'))
    .pipe(gulp.dest(config.assets + 'sass/'));
});

/**
 * Copy index.html to public
 */
gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest(config.build));
});

/**
 * Task to build assets on production server
 */
gulp.task('build',['clean'], function() {
  return gulp.start('vendors', 'styles', 'img', 'scripts', 'favicons', 'service-worker', 'html');
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function(done){
  runSequence(['css-vendors', 'fonts-vendors', 'img', 'styles', 'scripts'], 'favicons', 'html', 'service-worker', done);
});
