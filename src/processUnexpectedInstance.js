const ALLOWED_OPENERS = {
  to: true,
  not: true
};

const ASSERTIONS_TO_EXCLUDE = {
  "to be ok": true,
  "not to be ok": true
};

const ASSERTIONS_TO_FORCE_NO_VALUE = {
  "to be falsy": true,
  "to be truthy": true,
  "not to be falsy": true,
  "not to be truthy": true
};

function last(arr) {
  return arr[arr.length - 1];
}

function upperCaseFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function determineTypesOfValues(expect, assertionString) {
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

  return typesOfValues;
}

function processUnexpectedInstance(expect, assertions) {
  const casedDefinitions = {};

  Object.keys(assertions).forEach(assertionString => {
    const assertionTokens = assertionString.split(" ");
    const assertionOpener = assertionTokens[0];

    if (!(assertionOpener in ALLOWED_OPENERS)) {
      return;
    }

    if (assertionString in ASSERTIONS_TO_EXCLUDE) {
      return;
    }

    // skip any variants using "non-empty"
    if (assertionTokens.includes("non-empty")) {
      return;
    }

    let isNestingAllowed = false;
    if (last(assertionTokens) === "assertion") {
      assertionTokens.pop();
      assertionString = assertionTokens.join(" ");
      isNestingAllowed = true;
    }

    const camelCasedString =
      assertionOpener +
      assertionTokens
        .slice(1)
        .map(upperCaseFirst)
        .join("");
    const typesOfValues = determineTypesOfValues(expect, assertionString);

    if (
      casedDefinitions[camelCasedString] &&
      casedDefinitions[camelCasedString].isNestingAllowed
    ) {
      // avoid overwriting any assertion where nesting was enabled
      return;
    }

    // record all information derived for the assertion
    casedDefinitions[camelCasedString] = {
      assertionString,
      isNestingAllowed,
      typesOfValues
    };
  });

  return casedDefinitions;
}

module.exports = processUnexpectedInstance;
