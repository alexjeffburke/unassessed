const ALLOWED_OPENERS = {
  to: true,
  not: true
};

const ASSERTIONS_TO_EXCLUDE = {
  "to be ok": true,
  "not to be ok": true
};

function last(arr) {
  return arr[arr.length - 1];
}

function upperCaseFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function createCasedFunction(
  expect,
  __assertionString__,
  __camelCasedString__
) {
  return (subject, value) => {
    if (value.__itFunction) {
      throw new Error(
        `Nested assertions are not supported by .${__camelCasedString__}()`
      );
    }

    return expect(subject, __assertionString__, value);
  };
}

function createCasedFunctionOpen(expect, __assertionString__) {
  return (subject, value) => {
    return expect(subject, __assertionString__, value);
  };
}

function createCasedFunctions(expect, assertions) {
  const casedFunctions = {};
  const casedMap = {};
  const assertionsSupportingNesting = {};

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
      assertionsSupportingNesting[assertionString] = true;
      isNestingAllowed = true;
    }

    const camelCasedString =
      assertionOpener +
      assertionTokens
        .slice(1)
        .map(upperCaseFirst)
        .join("");
    casedMap[camelCasedString] = assertionString;
    const __assertionString__ = assertionString;
    const __camelCasedString__ = camelCasedString;

    if (isNestingAllowed) {
      // replace cased function with one
      // that allows nested assertions
      casedFunctions[camelCasedString] = createCasedFunctionOpen(
        expect,
        __assertionString__
      );
    }

    if (assertionsSupportingNesting[assertionString]) {
      // avoid overwriting any assertion where nesting was enabled
      return;
    }

    casedFunctions[camelCasedString] = createCasedFunction(
      expect,
      __assertionString__,
      __camelCasedString__
    );
  });

  return { casedFunctions, casedMap };
}

module.exports = createCasedFunctions;
