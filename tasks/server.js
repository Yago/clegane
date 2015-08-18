'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    browserSync   = require('browser-sync'),
    runSequence   = require('run-sequence');

module.exports = function() {

  var reload = browserSync.reload;

 /**
  * Serve
  */
  gulp.task('serve', ['default'], function () {
    browserSync({
      server: {
        baseDir: [config.app.basedir],
      },
      open: false
    });
    gulp.watch([config.assets + 'sass/**/*.scss'], function() {
      runSequence('styles', 'styleguide', reload);
    });
    gulp.watch([config.assets + 'sass/styleguide.scss'], function() {
      runSequence('styleguide-styles', 'styleguide', reload);
    });
    gulp.watch([config.assets + 'img/**/*'], function() {
      runSequence('img', 'styleguide', reload);
    });
    gulp.watch([config.assets + 'icons/**/*'], function() {
      runSequence('icons', 'styleguide', reload);
    });
    gulp.watch([config.assets + 'js/**/*.js'], function() {
      runSequence('scripts', 'styleguide', reload);
    });
    gulp.watch([
      config.assets + 'components/**/*.{html,hbs,md}',
      config.assets + 'templates/**/*.html',
      config.assets + 'docs/**/*.md',
      config.assets + 'data/**/*.{json,yml}'
    ], function() {
      runSequence('styleguide', reload);
    });
  });

}
