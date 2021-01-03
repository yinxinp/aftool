// babel.config.js
module.exports = api => {
  let useBuiltIns;
  let targets, corejs;
  const isWeb = api.caller(caller => caller && caller.target === "web");
  if (isWeb) {
    useBuiltIns = "usage";
    corejs = 3;
    targets = { chrome: "58", ie: "11" };
  } else {
    targets = { node: "current" };
    useBuiltIns = false;
  }
  return {
    presets: [
      ["@babel/preset-env", { useBuiltIns, targets, corejs }],
      "@babel/preset-typescript"
    ]
  };
};
