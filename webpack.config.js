const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(|css|)$/,
        loaders: ['css-loader', 'style-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loaders: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // plugins: [HTMLWebpackPluginConfig],
  mode: 'development',
};
