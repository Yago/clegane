/* globals require, module, process, __dirname */

const webpack = require('webpack');
const path    = require('path');

const environment = process.env.NODE_ENV || 'development';
const isProd = environment === 'production';

module.exports = {
  context: path.join(__dirname, './app'),
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './index.jsx'
    ],
    vendors: [
      'awesomplete',
      'firebase',
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-thunk',
      'redux-logger',
      'isomorphic-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: '[name].bundle.js'
  },
  debug: environment,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot-loader/webpack',
          'babel?presets[]=es2015,presets[]=react,plugins[]=transform-object-rest-spread,plugins[]=transform-es2015-spread',
          'webpack-module-hot-accept'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      'node_modules'
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: 1,
      filename: 'vendors.bundle.js'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: 1,
      filename: 'vendors.bundle.js'
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
