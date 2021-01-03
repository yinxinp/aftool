const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const resolve = filename => path.resolve(__dirname, filename);

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: resolve("../dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/, resolve("./srcback")]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".js"]
  }
};
