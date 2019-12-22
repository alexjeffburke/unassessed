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
      if (
        (value && value.__itPlaceholder) ||
        (value2 && value2.__itPlaceholder)
      ) {
        throw new Error(
          `unassessed: nested assertions are not supported by .${__camelCasedString__}()`
        );
      }

      return expect(subject, __assertionString__, value, value2);
    };
  }

  return (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .${__camelCasedString__}()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, __assertionString__, ...args);
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
