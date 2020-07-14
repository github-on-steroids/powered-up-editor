'use strict'
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    // options: './src/options',
    background: './src/background.js',
    content: './src/content.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {},
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'src',
        ignore: '*.js',
      },
    ]),
  ],
  output: {
    path: path.join(__dirname, 'extension'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
