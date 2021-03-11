module.exports = {
  module: {
    rules: [
      {
        // 这边用babel将es6转换成es5   ===>如果没必要就不需要转换
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
