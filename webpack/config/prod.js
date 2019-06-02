



const webpackMerge = require("webpack-merge")
const common = require("./common.js")

module.exports = webpackMerge(common,{
  mode: 'production',
  devtool: 'none',
});
