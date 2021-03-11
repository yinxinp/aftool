const path = require("path");
const commonConfig = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const prodConfig = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
    library: "aftool",
    libraryTarget: "umd",
  },
};
module.exports = merge(commonConfig, prodConfig);
