module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["warn", "unix"],
    quotes: ["error", "double"],
    semi: ["warn", "never"]
  }
}
