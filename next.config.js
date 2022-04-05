const removeImports = require("next-remove-imports")();
const withTM = require('next-transpile-modules')(['react-markdown']);


/** @type {import('next').NextConfig} */
/* module.exports = {
  reactStrictMode: true,
} */

module.exports = (phase, { defaultConfig }) => {
  return removeImports(withTM({
    ...defaultConfig
  }));
};
