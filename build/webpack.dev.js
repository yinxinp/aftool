const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const { output } = require("./webpack.common");
const devConfig = {
  mode: "development",
  output: { library: "aftool", libraryTarget: "umd" }
};
module.exports = merge(devConfig, commonConfig);
