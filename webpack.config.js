const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, '/dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true, minimize: true }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  }
};
