const path = require("path");
const prodConfig = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      // {
      //   // 这边用babel将es6转换成es5   ===>如果没必要就不需要转换
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "babel-loader"
      // }
    ]
  },
  output: {
    filename: "aftool.js",
    path: path.resolve(__dirname, "../dist"),
    library: "aftool",
    libraryTarget: "umd"
  }
};
module.exports = prodConfig;
