const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ]
});