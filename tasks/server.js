'use strict';

var gulp                  = require('gulp'),
    $                     = require('gulp-load-plugins')(),
    config                = require('../gulp_config.json'),
    browserSync           = require('browser-sync'),
    runSequence           = require('run-sequence'),
    historyApiFallback    = require('connect-history-api-fallback');

module.exports = function() {

  var reload = browserSync.reload;

 /**
  * Serve
  */
  gulp.task('serve', ['default'], function () {
    browserSync({
      server: {
        baseDir: [config.app.basedir]
      },
      middleware : [ historyApiFallback() ],
      open: false
    });
    gulp.watch([config.assets + 'sass/**/*.scss'], function() {
      runSequence('styles', 'service-worker', reload);
    });
    gulp.watch(['app/index.html'], function() {
      runSequence('html', 'service-worker', reload);
    });
    gulp.watch([config.assets + 'icons/**/*'], function() {
      runSequence('icons', 'styleguide', reload);
    });
    gulp.watch([config.assets + 'img/**/*', config.assets + 'svg/**/*'], function() {
      runSequence('img', 'service-worker', reload);
    });
    gulp.watch(['app/**/*.{jsx,js}'], function() {
      runSequence('scripts', 'service-worker', reload);
    });
  });

}
