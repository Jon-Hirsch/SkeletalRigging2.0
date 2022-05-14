
const merge = require('webpack-merge');
const common = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
