var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
};
