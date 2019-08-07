const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  };

  return config;
};
