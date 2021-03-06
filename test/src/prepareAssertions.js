const expect = require("unexpected");

const prepareAssertions = require("../../src/prepareAssertions");

describe("src/prepareAssertions", () => {
  it("should list the expected assertions", () => {
    const prepared = prepareAssertions(expect);

    expect(Object.keys(prepared), "to equal", [
      "not to be ok",
      "not to be truthy",
      "to be ok",
      "to be truthy",
      "not to be",
      "to be",
      "not to be true",
      "to be true",
      "not to be false",
      "to be false",
      "not to be falsy",
      "to be falsy",
      "not to be null",
      "to be null",
      "not to be undefined",
      "to be undefined",
      "not to be defined",
      "to be defined",
      "not to be NaN",
      "to be NaN",
      "not to be close to",
      "to be close to",
      "not to be a",
      "not to be an",
      "to be a",
      "to be an",
      "not to be one of",
      "to be one of",
      "not to be an object",
      "not to be an array",
      "to be an object",
      "to be an array",
      "not to be a boolean",
      "not to be a number",
      "not to be a string",
      "not to be a function",
      "not to be a regexp",
      "not to be a regex",
      "not to be a regular expression",
      "not to be a date",
      "to be a boolean",
      "to be a number",
      "to be a string",
      "to be a function",
      "to be a regexp",
      "to be a regex",
      "to be a regular expression",
      "to be a date",
      "to be the empty string",
      "to be an empty string",
      "to be a non-empty string",
      "to be the empty array",
      "to be an empty array",
      "to be a non-empty array",
      "to match",
      "not to match",
      "not to have own property",
      "to have own property",
      "not to have enumerable property",
      "not to have configurable property",
      "not to have writable property",
      "to have enumerable property",
      "to have configurable property",
      "to have writable property",
      "not to have property",
      "to have property",
      "not to only have own properties",
      "not to only have properties",
      "not to have own properties",
      "not to have properties",
      "to only have own properties",
      "to only have properties",
      "to have own properties",
      "to have properties",
      "not to have length",
      "to have length",
      "not to be empty",
      "to be empty",
      "to be non-empty",
      "to not only have keys",
      "to not have keys",
      "to only have keys",
      "to have keys",
      "not to have keys",
      "not to have key",
      "to not only have key",
      "to not have key",
      "to only have key",
      "to have key",
      "not to contain",
      "to contain",
      "not to begin with",
      "to begin with",
      "not to start with",
      "to start with",
      "not to end with",
      "to end with",
      "not to be finite",
      "to be finite",
      "not to be infinite",
      "to be infinite",
      "not to be within",
      "to be within",
      "not to be less than",
      "not to be below",
      "to be less than",
      "to be below",
      "not to be less than or equal to",
      "to be less than or equal to",
      "not to be greater than",
      "not to be above",
      "to be greater than",
      "to be above",
      "not to be greater than or equal to",
      "to be greater than or equal to",
      "not to be positive",
      "to be positive",
      "not to be negative",
      "to be negative",
      "to equal",
      "not to equal",
      "to error",
      "to error with",
      "not to error",
      "not to throw",
      "to throw",
      "to throw error",
      "to throw exception",
      "to satisfy",
      "to throw a",
      "to throw an",
      "to have arity",
      "to have values exhaustively satisfying",
      "to have values satisfying",
      "to be a map whose values exhaustively satisfy",
      "to be a map whose values satisfy",
      "to be a hash whose values exhaustively satisfy",
      "to be a hash whose values satisfy",
      "to be an object whose values exhaustively satisfy",
      "to be an object whose values satisfy",
      "to have items exhaustively satisfying",
      "to have items satisfying",
      "to be an array whose items exhaustively satisfy",
      "to be an array whose items satisfy",
      "to have keys satisfying",
      "to be a map whose keys satisfy",
      "to be a map whose properties satisfy",
      "to be a hash whose keys satisfy",
      "to be a hash whose properties satisfy",
      "to be an object whose keys satisfy",
      "to be an object whose properties satisfy",
      "not to have a value exhaustively satisfying",
      "not to have a value satisfying",
      "to have a value exhaustively satisfying",
      "to have a value satisfying",
      "not to have an item exhaustively satisfying",
      "not to have an item satisfying",
      "to have an item exhaustively satisfying",
      "to have an item satisfying",
      "to be canonical",
      "to have message",
      "to exhaustively satisfy",
      "when decoded as",
      "decoded as",
      "not to exhaustively satisfy",
      "not to satisfy",
      "when called with",
      "called with",
      "when called",
      "called",
      "when passed as parameters to async",
      "when passed as parameters to",
      "passed as parameters to async",
      "passed as parameters to",
      "when passed as parameters to constructor",
      "passed as parameters to constructor",
      "when passed as parameter to async",
      "when passed as parameter to",
      "passed as parameter to async",
      "passed as parameter to",
      "when passed as parameter to constructor",
      "passed as parameter to constructor",
      "when sorted numerically",
      "when sorted",
      "sorted numerically",
      "sorted",
      "when sorted by",
      "sorted by",
      "to be rejected",
      "to be rejected with",
      "to be rejected with error exhaustively satisfying",
      "to be rejected with error satisfying",
      "to be fulfilled",
      "to be fulfilled with",
      "to be fulfilled with value exhaustively satisfying",
      "to be fulfilled with value satisfying",
      "when rejected",
      "when fulfilled",
      "to call the callback",
      "to call the callback without error",
      "to call the callback with error"
    ]);
  });

  it("should not have duplicates when the assertion suffix is discarded", () => {
    const prepared = prepareAssertions(expect);

    const seenAssertions = [];
    const seenDuplicates = [];

    Object.keys(prepared).forEach(assertionString => {
      if (assertionString.endsWith(" assertion")) {
        assertionString = assertionString.slice(0, -" assertion".length);
      }

      if (!seenAssertions[assertionString]) {
        seenAssertions[assertionString] = true;
      } else {
        seenDuplicates.push(assertionString);
      }
    });

    expect.withError(
      () => {
        expect(seenDuplicates, "to be empty");
      },
      () => {
        expect.fail(
          `The following assertions were duplicated:\n${seenDuplicates.join(
            ",\n"
          )}`
        );
      }
    );
  });

  describe('when processing "to satisfy"', () => {
    it("should contain a definition with the suffix", () => {
      const prepared = prepareAssertions(expect);

      expect(prepared, "to have property", "to satisfy");
    });

    it("should not contain a definition without the suffix", () => {
      const prepared = prepareAssertions(expect);

      expect(prepared, "not to have property", "to satisfy assertion");
    });

    it("should contain the correct number of definitions", () => {
      const prepared = prepareAssertions(expect);
      const definitions = prepared["to satisfy"];

      expect(definitions.length, "to be greater than", 5);
    });
  });
});
