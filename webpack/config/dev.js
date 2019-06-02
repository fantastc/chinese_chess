const path = require('path');
const webpack = require('webpack');





const webpackMerge = require("webpack-merge")
const common = require("./common.js")

module.exports = webpackMerge(common,{
  mode: 'development',
  devtool: '#source-map',
});
