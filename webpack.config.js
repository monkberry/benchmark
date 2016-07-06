module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    noParse: [
      __dirname + '/node_modules/benchmark/benchmark.js'
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bundle\.js)/,
        loader: 'babel-loader'
      }
    ]
  }
};
