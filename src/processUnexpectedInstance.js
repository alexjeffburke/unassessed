const ASSERTIONS_TO_EXCLUDE = {
  called: true,
  "when called": true,
  "called with": true,
  "when called with": true,
  "decoded as": true,
  "when decoded as": true,
  "passed as parameter to": true,
  "when passed as parameter to": true,
  "passed as parameters to": true,
  "when passed as parameters to": true,
  "passed as parameter to async": true,
  "when passed as parameter to async": true,
  "passed as parameters to async": true,
  "passed as parameter to constructor": true,
  "when passed as parameter to constructor": true,
  "when passed as parameters to async": true,
  "passed as parameters to constructor": true,
  "when passed as parameters to constructor": true,
  sorted: true,
  "when sorted": true,
  "sorted by": true,
  "when sorted by": true,
  "sorted numerically": true,
  "when sorted numerically": true,
  "when fulfilled": true,
  "when rejected": true,
  // "to only have properties" - only and not are mutually exclusive
  "not to only have own properties": true,
  "not to only have properties": true,
  // "to have key"
  "to have key": true,
  "to only have key": true,
  "to not have key": true,
  "to not only have key": true,
  "not to have key": true,
  // "to have keys"
  "to have keys": true,
  "to only have keys": true,
  "to not have keys": true,
  "to not only have keys": true,
  "not to have keys": true,
  // others
  "to be ok": true,
  "not to be ok": true
};

const ASSERTIONS_TO_FORCE_NO_VALUE = {
  "to be falsy": true,
  "to be truthy": true,
  "not to be falsy": true,
  "not to be truthy": true
};

function upperCaseFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function determineTypesOfValues(expect, assertionString) {
  const originalAssertion = expect.assertions[assertionString];

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
  return typesOfValues;
}

function processUnexpectedInstance(expect, assertions) {
  const casedDefinitions = {};

  Object.keys(assertions).forEach(assertionString => {
    const assertionTokens = assertionString.split(" ");
    const assertionOpener = assertionTokens[0];

    if (assertionString in ASSERTIONS_TO_EXCLUDE) {
      return;
    }

    // skip any variants using "non-empty"
    if (assertionTokens.includes("non-empty")) {
      return;
    }

    const camelCasedString =
      assertionOpener +
      assertionTokens
        .slice(1)
        .map(upperCaseFirst)
        .join("");

    const typesOfValues =
      assertionString in ASSERTIONS_TO_FORCE_NO_VALUE
        ? [] // TODO: remove this workaround when "to be ok" string value is removed
        : determineTypesOfValues(expect, assertionString);

    if (
      casedDefinitions[camelCasedString] &&
      casedDefinitions[camelCasedString].isNestingAllowed
    ) {
      // avoid overwriting any assertion where nesting was enabled
      return;
    }

    // check whether the assertion allows a something to be nested
    // on the RHS - is so, mark it so we generate the correct checks
    const maybeNested =
      typesOfValues.length > 0 &&
      (typesOfValues[typesOfValues.length - 1].has("assertion?") ||
        typesOfValues[typesOfValues.length - 1].has("assertion"));

    const lastTypesSet = maybeNested && typesOfValues[typesOfValues.length - 1];
    const isMiddleRocket = maybeNested && lastTypesSet.size === 1;
    const isNestingAllowed = maybeNested && lastTypesSet.size > 1;

    // record all information derived for the assertion
    casedDefinitions[camelCasedString] = {
      assertionString,
      isMiddleRocket,
      isNestingAllowed,
      typesOfValues
    };
  });

  return casedDefinitions;
}

module.exports = processUnexpectedInstance;
