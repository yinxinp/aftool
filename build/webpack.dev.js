const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const devConfig = {
  mode: "development",
  entry: "./test/index.ts",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "test",
    port: 8080,
    hot: true
  },
  module: {},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "test")
  }
};

module.exports = merge(commonConfig, devConfig);
