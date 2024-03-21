/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: "@vinicius1313/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "example",
    "lib",
  ],
}
