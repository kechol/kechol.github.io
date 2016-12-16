let path = require('path');
let autoprefixer = require('autoprefixer');
let precss = require('precss');

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?presets[]=es2015"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
      },
      {
        test: /\.html$/,
        loader: 'raw-loader!html-minifier-loader!file-loader?name=index.html'
      }
    ]
  },
  postcss: () => {
    return [autoprefixer, precss];
  },
  'html-minifier-loader': {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true
  }
};
