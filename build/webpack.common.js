const path = require("path");

const resolve = filename => path.resolve(__dirname, filename);

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
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
  resolve: {
    extensions: [".ts", ".js"]
  }
};
