var webpack = require('webpack');

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.monk?$/,
        loader: 'monkberry-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
