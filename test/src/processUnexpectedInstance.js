const expect = require("unexpected");

const processUnexpectedInstance = require("../../src/processUnexpectedInstance");
const { determineTypesOfValues } = processUnexpectedInstance;

describe("processUnexpectedInstance", () => {
  describe("determineTypesOfValues", () => {
    it("should convert a no value assertion", () => {
      const result = determineTypesOfValues(expect, "to be a string");

      expect(result, "to exhaustively satisfy", []);
    });

    it("should convert a single value assertion", () => {
      const result = determineTypesOfValues(expect, "to start with");

      expect(result, "to exhaustively satisfy", [
        expect.it(value => expect(value.has("string"), "to be true"))
      ]);
    });
  });
});
