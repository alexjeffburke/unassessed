#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const createCasedFunctions = require("../lib/createCasedFunctions");
const prepareAssertions = require("../lib/prepareAssertions");

const ASSERTIONS_TO_FORCE_NO_VALUE = {
  "to be falsy": true,
  "to be truthy": true,
  "not to be falsy": true,
  "not to be truthy": true
};

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
  const { casedFunctions, casedMap } = createCasedFunctions(expect, assertions);

  const matchers = Object.keys(casedFunctions).map(key => {
    const assertionString = casedMap[key];
    let originalAssertion = expect.assertions[assertionString];

    // TODO: remove this workaround when "to be ok" string value it removed
    if (assertionString in ASSERTIONS_TO_FORCE_NO_VALUE) {
      originalAssertion = [];
    }

    const typesOfValues = [];
    originalAssertion.forEach(definition => {
      const valueMatches = definition.declaration.match(
        /(?: <([a-zA-z-]+[?]?(?:[|][a-zA-z-]+)*)>)* <([a-zA-z-]+[?]?(?:[|][a-zA-z-]+)*)>$/
      );
      if (valueMatches) {
        const validMatches = valueMatches.slice(1).filter(Boolean);
        validMatches.forEach((valueMatch, index) => {
          if (!valueMatch) return;
          let typeOfValue;
          if (typesOfValues.length <= index) {
            typeOfValue = new Set();
            typesOfValues.push(typeOfValue);
          } else {
            typeOfValue = typesOfValues[index];
          }
          valueMatch.split("|").map(type => typeOfValue.add(type));
        });
      }
    });
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
