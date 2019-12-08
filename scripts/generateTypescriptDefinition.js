#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");

const TYPE_NAMES_TO_EXCLUDE = {
  assertion: true,
  type: true,
  wrapperObject: true
};

const TYPE_NAMES_TO_MAP = {
  array: "any[]",
  "array-like": "any[]",
  binaryArray: "Uint8Array",
  function: "Constructable",
  regexp: "RegExp"
};

const interfaceTemplate = fs.readFileSync(
  path.join(__dirname, "..", "templates", "unexempted.d.ts"),
  "utf8"
);

function isLastChr(str, chr) {
  return str[str.length - 1] === chr;
}

function convertTypeIfRequired(typeName) {
  if (TYPE_NAMES_TO_EXCLUDE[typeName]) return "";
  if (typeName in TYPE_NAMES_TO_MAP) typeName = TYPE_NAMES_TO_MAP[typeName];
  if (isLastChr(typeName, "?")) typeName = typeName.slice(0, -1);
  return typeName;
}

function populateTempalate(expect) {
  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);
  const casedFunctions = createCasedFunctions(expect, casedDefinitions);

  const matchers = Object.keys(casedFunctions).map(key => {
    const { typesOfValues } = casedDefinitions[key];

    if (typesOfValues.length === 0) {
      return `${key}(): Result`;
    }

    const valueTypes = typesOfValues.map((typesOfValue, index) => {
      const typesArray = Array.from(typesOfValue);
      const typesString = typesArray
        .map(convertTypeIfRequired)
        .filter(Boolean)
        .join("|");
      const valueId = index === 0 ? "" : String(index + 1);
      const isOptional = typesArray.some(str => isLastChr(str, "?"));
      return `value${valueId}${isOptional ? "?" : ""}: ${typesString}`;
    });
    return `${key}(${valueTypes.join(", ")}): Result`;
  });

  const matcherString = matchers.join("\n    ");

  return interfaceTemplate.replace("/* __matchers__ */", matcherString);
}

module.exports = generateTypescriptDefinition;

function generateTypescriptDefinition(outputFile, pathToExpect) {
  const expect = require("unexpected");

  fs.writeFileSync(
    path.resolve(process.cwd(), outputFile),
    populateTempalate(expect),
    "utf8"
  );
}

if (require.main === module) {
  generateTypescriptDefinition(process.argv[2], process.argv[3]);
}
