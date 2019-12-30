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

    describe("when encountering vargs", () => {
      it("should should treat a single value assertion as one non-variable arg", () => {
        const result = determineTypesOfValues(expect, "to contain");

        expect(result, "to exhaustively satisfy", [
          expect.it(value => expect(value.has("string"), "to be true"))
        ]);
      });

      it("should should treat a double value assertion as two non-variable args", () => {
        const expectWithExtra = expect
          .clone()
          .addAssertion("<array-like> to foo <string> <string+>", () => {});

        const result = determineTypesOfValues(expectWithExtra, "to foo");

        expect(result, "to exhaustively satisfy", [
          expect.it(value => expect(value.has("string"), "to be true")),
          expect.it(value => expect(value.has("string"), "to be true"))
        ]);
      });
    });
  });
});
