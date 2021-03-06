const pkg = require("./package.json");
const buble = require("rollup-plugin-buble");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

const plugins = [commonjs({ ignore: ["unexpected"] }), nodeResolve(), buble()];

module.exports = [
  {
    input: pkg.main,
    output: {
      file: "unassessed.js",
      name: "unassessed",
      exports: "default",
      format: "umd",
      sourcemap: true,
      strict: false
    },
    plugins
  },
  {
    input: pkg.main,
    output: {
      file: "unassessed.esm.js",
      name: "unassessed",
      exports: "default",
      format: "esm",
      sourcemap: true,
      strict: false
    },
    plugins
  },
  {
    input: pkg.main,
    output: {
      file: "unassessed.min.js",
      name: "unassessed",
      exports: "default",
      format: "umd",
      sourcemap: false,
      strict: false
    },
    plugins: plugins.concat([terser()])
  }
];
