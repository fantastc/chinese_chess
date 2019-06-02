const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
*/

const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin"); 

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor',
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].[chunkhash].js',
  },
  
  module: {
    rules: [
      { test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        options: {
          plugins: ['syntax-dynamic-import'],
          
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              },
            ],
          ],
        },
      },
      { test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            
            options: {
              sourceMap: true
            },
          },
          {
            loader: 'less-loader',
            
            options: {
              sourceMap: true
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
  ],
  
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        },
      },
      
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};


