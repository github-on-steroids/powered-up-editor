'use strict';
const path = require('path');
const webpack = require('webpack');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: { index: './src/index.ts' },
  plugins: [
    new webpack.DefinePlugin({
      process: {},
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'src',
        ignore: '*.ts',
      },
    ]),
    // new DeclarationBundlerPlugin({
    //   moduleName: 'editor',
    //   out: './index.d.ts',
    // }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
