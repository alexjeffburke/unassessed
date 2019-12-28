module.exports = expect => ({
  notToBeTruthy: subject => {
    return expect(subject, "not to be truthy");
  },
  toBeTruthy: subject => {
    return expect(subject, "to be truthy");
  },
  notToBe: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBe()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be", ...args);
  },
  toBe: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBe()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be", ...args);
  },
  notToBeTrue: subject => {
    return expect(subject, "not to be true");
  },
  toBeTrue: subject => {
    return expect(subject, "to be true");
  },
  notToBeFalse: subject => {
    return expect(subject, "not to be false");
  },
  toBeFalse: subject => {
    return expect(subject, "to be false");
  },
  notToBeFalsy: subject => {
    return expect(subject, "not to be falsy");
  },
  toBeFalsy: subject => {
    return expect(subject, "to be falsy");
  },
  notToBeNull: subject => {
    return expect(subject, "not to be null");
  },
  toBeNull: subject => {
    return expect(subject, "to be null");
  },
  notToBeUndefined: subject => {
    return expect(subject, "not to be undefined");
  },
  toBeUndefined: subject => {
    return expect(subject, "to be undefined");
  },
  notToBeDefined: subject => {
    return expect(subject, "not to be defined");
  },
  toBeDefined: subject => {
    return expect(subject, "to be defined");
  },
  notToBeNaN: subject => {
    return expect(subject, "not to be NaN");
  },
  toBeNaN: subject => {
    return expect(subject, "to be NaN");
  },
  notToBeCloseTo: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeCloseTo()`
      );
    }

    return expect(subject, "not to be close to", value, value2);
  },
  toBeCloseTo: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeCloseTo()`
      );
    }

    return expect(subject, "to be close to", value, value2);
  },
  notToBeA: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeA()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be a", ...args);
  },
  notToBeAn: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeAn()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be an", ...args);
  },
  toBeA: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeA()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be a", ...args);
  },
  toBeAn: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeAn()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be an", ...args);
  },
  notToBeOneOf: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeOneOf()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be one of", ...args);
  },
  toBeOneOf: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeOneOf()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be one of", ...args);
  },
  notToBeAnObject: subject => {
    return expect(subject, "not to be an object");
  },
  notToBeAnArray: subject => {
    return expect(subject, "not to be an array");
  },
  toBeAnObject: subject => {
    return expect(subject, "to be an object");
  },
  toBeAnArray: subject => {
    return expect(subject, "to be an array");
  },
  notToBeABoolean: subject => {
    return expect(subject, "not to be a boolean");
  },
  notToBeANumber: subject => {
    return expect(subject, "not to be a number");
  },
  notToBeAString: subject => {
    return expect(subject, "not to be a string");
  },
  notToBeAFunction: subject => {
    return expect(subject, "not to be a function");
  },
  notToBeARegexp: subject => {
    return expect(subject, "not to be a regexp");
  },
  notToBeARegex: subject => {
    return expect(subject, "not to be a regex");
  },
  notToBeARegularExpression: subject => {
    return expect(subject, "not to be a regular expression");
  },
  notToBeADate: subject => {
    return expect(subject, "not to be a date");
  },
  toBeABoolean: subject => {
    return expect(subject, "to be a boolean");
  },
  toBeANumber: subject => {
    return expect(subject, "to be a number");
  },
  toBeAString: subject => {
    return expect(subject, "to be a string");
  },
  toBeAFunction: subject => {
    return expect(subject, "to be a function");
  },
  toBeARegexp: subject => {
    return expect(subject, "to be a regexp");
  },
  toBeARegex: subject => {
    return expect(subject, "to be a regex");
  },
  toBeARegularExpression: subject => {
    return expect(subject, "to be a regular expression");
  },
  toBeADate: subject => {
    return expect(subject, "to be a date");
  },
  toBeTheEmptyString: subject => {
    return expect(subject, "to be the empty string");
  },
  toBeAnEmptyString: subject => {
    return expect(subject, "to be an empty string");
  },
  toBeTheEmptyArray: subject => {
    return expect(subject, "to be the empty array");
  },
  toBeAnEmptyArray: subject => {
    return expect(subject, "to be an empty array");
  },
  toMatch: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toMatch()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to match", ...args);
  },
  notToMatch: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToMatch()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to match", ...args);
  },
  notToHaveOwnProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveOwnProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have own property", ...args);
  },
  toHaveOwnProperty: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveOwnProperty()`
      );
    }

    return expect(subject, "to have own property", value, value2);
  },
  notToHaveEnumerableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveEnumerableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have enumerable property", ...args);
  },
  notToHaveConfigurableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveConfigurableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have configurable property", ...args);
  },
  notToHaveWritableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveWritableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have writable property", ...args);
  },
  toHaveEnumerableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveEnumerableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have enumerable property", ...args);
  },
  toHaveConfigurableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveConfigurableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have configurable property", ...args);
  },
  toHaveWritableProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveWritableProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have writable property", ...args);
  },
  notToHaveProperty: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveProperty()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have property", ...args);
  },
  toHaveProperty: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveProperty()`
      );
    }

    return expect(subject, "to have property", value, value2);
  },
  notToHaveOwnProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveOwnProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have own properties", ...args);
  },
  notToHaveProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have properties", ...args);
  },
  toOnlyHaveOwnProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toOnlyHaveOwnProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to only have own properties", ...args);
  },
  toOnlyHaveProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toOnlyHaveProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to only have properties", ...args);
  },
  toHaveOwnProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveOwnProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have own properties", ...args);
  },
  toHaveProperties: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveProperties()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have properties", ...args);
  },
  notToHaveLength: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToHaveLength()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to have length", ...args);
  },
  toHaveLength: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveLength()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have length", ...args);
  },
  notToBeEmpty: subject => {
    return expect(subject, "not to be empty");
  },
  toBeEmpty: subject => {
    return expect(subject, "to be empty");
  },
  notToContain: subject => {
    return expect(subject, "not to contain");
  },
  toContain: subject => {
    return expect(subject, "to contain");
  },
  notToBeginWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeginWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to begin with", ...args);
  },
  toBeginWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeginWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to begin with", ...args);
  },
  notToStartWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToStartWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to start with", ...args);
  },
  toStartWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toStartWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to start with", ...args);
  },
  notToEndWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToEndWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to end with", ...args);
  },
  toEndWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toEndWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to end with", ...args);
  },
  notToBeFinite: subject => {
    return expect(subject, "not to be finite");
  },
  toBeFinite: subject => {
    return expect(subject, "to be finite");
  },
  notToBeInfinite: subject => {
    return expect(subject, "not to be infinite");
  },
  toBeInfinite: subject => {
    return expect(subject, "to be infinite");
  },
  notToBeWithin: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeWithin()`
      );
    }

    return expect(subject, "not to be within", value, value2);
  },
  toBeWithin: (subject, value, value2) => {
    if (
      (value && value.__itPlaceholder) ||
      (value2 && value2.__itPlaceholder)
    ) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeWithin()`
      );
    }

    return expect(subject, "to be within", value, value2);
  },
  notToBeLessThan: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeLessThan()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be less than", ...args);
  },
  notToBeBelow: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeBelow()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be below", ...args);
  },
  toBeLessThan: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeLessThan()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be less than", ...args);
  },
  toBeBelow: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeBelow()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be below", ...args);
  },
  notToBeLessThanOrEqualTo: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeLessThanOrEqualTo()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be less than or equal to", ...args);
  },
  toBeLessThanOrEqualTo: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeLessThanOrEqualTo()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be less than or equal to", ...args);
  },
  notToBeGreaterThan: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeGreaterThan()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be greater than", ...args);
  },
  notToBeAbove: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeAbove()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be above", ...args);
  },
  toBeGreaterThan: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeGreaterThan()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be greater than", ...args);
  },
  toBeAbove: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeAbove()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be above", ...args);
  },
  notToBeGreaterThanOrEqualTo: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToBeGreaterThanOrEqualTo()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to be greater than or equal to", ...args);
  },
  toBeGreaterThanOrEqualTo: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeGreaterThanOrEqualTo()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be greater than or equal to", ...args);
  },
  notToBePositive: subject => {
    return expect(subject, "not to be positive");
  },
  toBePositive: subject => {
    return expect(subject, "to be positive");
  },
  notToBeNegative: subject => {
    return expect(subject, "not to be negative");
  },
  toBeNegative: subject => {
    return expect(subject, "to be negative");
  },
  toEqual: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toEqual()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to equal", ...args);
  },
  notToEqual: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToEqual()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to equal", ...args);
  },
  toError: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toError()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to error", ...args);
  },
  toErrorWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toErrorWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to error with", ...args);
  },
  notToError: subject => {
    return expect(subject, "not to error");
  },
  notToThrow: subject => {
    return expect(subject, "not to throw");
  },
  toThrow: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toThrow()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to throw", ...args);
  },
  toThrowError: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toThrowError()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to throw error", ...args);
  },
  toThrowException: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toThrowException()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to throw exception", ...args);
  },
  toSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to satisfy", valueOrItPlaceholder);
  },
  toThrowA: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toThrowA()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to throw a", ...args);
  },
  toThrowAn: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toThrowAn()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to throw an", ...args);
  },
  toHaveArity: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveArity()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have arity", ...args);
  },
  toHaveValuesExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to have values exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveValuesSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to have values satisfying", valueOrItPlaceholder);
  },
  toBeAMapWhoseValuesExhaustivelySatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a map whose values exhaustively satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAMapWhoseValuesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a map whose values satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAHashWhoseValuesExhaustivelySatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a hash whose values exhaustively satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAHashWhoseValuesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a hash whose values satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAnObjectWhoseValuesExhaustivelySatisfy: (
    subject,
    valueOrItPlaceholder
  ) => {
    return expect(
      subject,
      "to be an object whose values exhaustively satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAnObjectWhoseValuesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be an object whose values satisfy",
      valueOrItPlaceholder
    );
  },
  toHaveItemsExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to have items exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveItemsSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to have items satisfying", valueOrItPlaceholder);
  },
  toBeAnArrayWhoseItemsExhaustivelySatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be an array whose items exhaustively satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAnArrayWhoseItemsSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be an array whose items satisfy",
      valueOrItPlaceholder
    );
  },
  toHaveKeysSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to have keys satisfying", valueOrItPlaceholder);
  },
  toBeAMapWhoseKeysSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a map whose keys satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAMapWhosePropertiesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a map whose properties satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAHashWhoseKeysSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a hash whose keys satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAHashWhosePropertiesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be a hash whose properties satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAnObjectWhoseKeysSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be an object whose keys satisfy",
      valueOrItPlaceholder
    );
  },
  toBeAnObjectWhosePropertiesSatisfy: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to be an object whose properties satisfy",
      valueOrItPlaceholder
    );
  },
  notToHaveAValueExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "not to have a value exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  notToHaveAValueSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "not to have a value satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveAValueExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to have a value exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveAValueSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to have a value satisfying", valueOrItPlaceholder);
  },
  notToHaveAnItemExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "not to have an item exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  notToHaveAnItemSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "not to have an item satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveAnItemExhaustivelySatisfying: (subject, valueOrItPlaceholder) => {
    return expect(
      subject,
      "to have an item exhaustively satisfying",
      valueOrItPlaceholder
    );
  },
  toHaveAnItemSatisfying: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to have an item satisfying", valueOrItPlaceholder);
  },
  toBeCanonical: subject => {
    return expect(subject, "to be canonical");
  },
  toHaveMessage: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toHaveMessage()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to have message", ...args);
  },
  toExhaustivelySatisfy: (subject, valueOrItPlaceholder) => {
    return expect(subject, "to exhaustively satisfy", valueOrItPlaceholder);
  },
  notToExhaustivelySatisfy: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToExhaustivelySatisfy()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to exhaustively satisfy", ...args);
  },
  notToSatisfy: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .notToSatisfy()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "not to satisfy", ...args);
  },
  toBeRejected: subject => {
    return expect(subject, "to be rejected");
  },
  toBeRejectedWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeRejectedWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be rejected with", ...args);
  },
  toBeRejectedWithErrorExhaustivelySatisfying: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeRejectedWithErrorExhaustivelySatisfying()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(
      subject,
      "to be rejected with error exhaustively satisfying",
      ...args
    );
  },
  toBeRejectedWithErrorSatisfying: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeRejectedWithErrorSatisfying()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be rejected with error satisfying", ...args);
  },
  toBeFulfilled: subject => {
    return expect(subject, "to be fulfilled");
  },
  toBeFulfilledWith: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeFulfilledWith()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be fulfilled with", ...args);
  },
  toBeFulfilledWithValueExhaustivelySatisfying: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeFulfilledWithValueExhaustivelySatisfying()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(
      subject,
      "to be fulfilled with value exhaustively satisfying",
      ...args
    );
  },
  toBeFulfilledWithValueSatisfying: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toBeFulfilledWithValueSatisfying()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to be fulfilled with value satisfying", ...args);
  },
  toCallTheCallback: subject => {
    return expect(subject, "to call the callback");
  },
  toCallTheCallbackWithoutError: subject => {
    return expect(subject, "to call the callback without error");
  },
  toCallTheCallbackWithError: (subject, ...rest) => {
    const value = rest.length === 1 ? rest[0] : undefined;
    if (value && value.__itPlaceholder) {
      throw new Error(
        `unassessed: nested assertions are not supported by .toCallTheCallbackWithError()`
      );
    }

    // TODO: type detection may need to be extended to record
    //       an empty argument type so we can restore being able
    //       to enforce the number of arguments where needed
    const args = rest.length === 1 ? [value] : [];

    return expect(subject, "to call the callback with error", ...args);
  }
});
