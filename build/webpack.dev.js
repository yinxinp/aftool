const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const devConfig = {
  mode: "development"
};
module.exports = merge(devConfig, commonConfig);
