const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: { library: "aftool", libraryTarget: "umd" }
};
module.exports = merge(devConfig, commonConfig);
