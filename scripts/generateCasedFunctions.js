#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");

function prepareFunctions(expect) {
  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);
  const casedFunctions = createCasedFunctions(expect, casedDefinitions);

  const functions = Object.keys(casedFunctions).map(key => {
    const { assertionString } = casedDefinitions[key];
    let fnString = casedFunctions[key].toString();
    // eslint-disable-next-line no-template-curly-in-string
    fnString = fnString.replace("${__camelCasedString__}", key);
    // eslint-disable-next-line no-template-curly-in-string
    fnString = fnString.replace("__assertionString__", `"${assertionString}"`);
    return `    ${key}: ${fnString}`;
  });

  return `module.exports = expect => ({\n${functions.join(",\n")}\n})\n`;
}

function generateCasedFunctions(outputFile) {
  const expect = require("unexpected");
  const output = formatSource(prepareFunctions(expect));

  fs.writeFileSync(path.resolve(process.cwd(), outputFile), output, "utf8");
}

function formatSource(code) {
  const prettierOptions = prettier.resolveConfig.sync(__filename, {
    editorconfig: true
  });

  return prettier.format(code, { ...prettierOptions, parser: "babel" });
}

module.exports = generateCasedFunctions;

if (require.main === module) {
  generateCasedFunctions(process.argv[2]);
}
