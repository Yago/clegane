/* globals require, module */

const gulp                  = require('gulp'),
      webpack               = require('webpack'),
      ora                   = require('ora'),
      $                     = require('gulp-load-plugins')(),
      config                = require('../gulp_config.json'),
      webpackSettings       = require('../webpack.config'),
      browserSync           = require('browser-sync'),
      runSequence           = require('run-sequence'),
      historyApiFallback    = require('connect-history-api-fallback'),
      webpackDevMiddleware  = require('webpack-dev-middleware'),
      webpackHotMiddleware  = require('webpack-hot-middleware');

const bundler = webpack(webpackSettings);

module.exports = function() {

  const reload = browserSync.reload;

 /**
  * Serve
  */
  gulp.task('serve', function () {

    browserSync({
      server: {
        baseDir: [config.app.basedir],
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: webpackSettings.output.publicPath,
            stats: {
              cached: false,
              colors: true,
            }
          }),
          webpackHotMiddleware(bundler)
        ]
      },
      // middleware : [ historyApiFallback() ],
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
    // gulp.watch(['app/**/*.{jsx,js}'], function() {
    //   runSequence('scripts', 'service-worker', reload);
    // });
  });

}
