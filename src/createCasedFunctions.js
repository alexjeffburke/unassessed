function createCasedFunction(
  expect,
  typesOfValues,
  __assertionString__,
  __camelCasedString__
) {
  if (typesOfValues.length === 0) {
    return subject => {
      return expect(subject, __assertionString__);
    };
  }

  if (typesOfValues.length === 2) {
    return (subject, value, value2) => {
      if (value.__itPlaceholder || value2.__itPlaceholder) {
        throw new Error(
          `unassessed: nested assertions are not supported by .${__camelCasedString__}()`
        );
      }

      return expect(subject, __assertionString__, value, value2);
    };
  }

  return (subject, value) => {
    if (value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .${__camelCasedString__}()`
      );
    }

    return expect(subject, __assertionString__, value);
  };
}

function createCasedFunctionOpen(expect, __assertionString__) {
  return (subject, valueOrItPlaceholder) => {
    return expect(subject, __assertionString__, valueOrItPlaceholder);
  };
}

function createCasedFunctions(expect, casedDefinitions) {
  const casedFunctions = {};

  Object.keys(casedDefinitions).forEach(camelCasedString => {
    const {
      assertionString,
      isNestingAllowed,
      typesOfValues
    } = casedDefinitions[camelCasedString];

    if (isNestingAllowed) {
      casedFunctions[camelCasedString] = createCasedFunctionOpen(
        expect,
        assertionString
      );
      return;
    }

    casedFunctions[camelCasedString] = createCasedFunction(
      expect,
      typesOfValues,
      assertionString,
      camelCasedString
    );
  });

  return casedFunctions;
}

module.exports = createCasedFunctions;
