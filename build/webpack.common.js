const path = require("path");

const resolve = path.resolve;

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/, resolve(__dirname, "./srcback")]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
