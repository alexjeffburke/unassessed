const expect = require("unexpected")
  .clone()
  .use(require("unexpected-sinon"));
const sinon = require("sinon");

const createCasedFunctions = require("../../src/createCasedFunctions");

describe("src/createCasedFunctions", () => {
  describe("with a no argument function", () => {
    const casedDefinitions = {
      toSomething: {
        assertionString: "the assertion",
        isNestingAllowed: false,
        typesOfValues: []
      }
    };

    it("should create a function", () => {
      const casedFunctions = createCasedFunctions(() => {}, casedDefinitions);

      expect(casedFunctions, "to exhaustively satisfy", {
        toSomething: expect.it("to be a function")
      });
    });

    it("should call down correctly", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );

      toSomething("foo");

      expect(fakeExpect, "to have a call exhaustively satisfying", [
        "foo",
        "the assertion"
      ]);
    });
  });

  describe("with a singular argument function", () => {
    const casedDefinitions = {
      toSomething: {
        assertionString: "the assertion",
        isNestingAllowed: false,
        typesOfValues: [new Set()]
      }
    };

    it("should create a function", () => {
      const casedFunctions = createCasedFunctions(() => {}, casedDefinitions);

      expect(casedFunctions, "to exhaustively satisfy", {
        toSomething: expect.it("to be a function")
      });
    });

    it("should call down correctly", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );

      toSomething("foo", "bar");

      expect(fakeExpect, "to have a call exhaustively satisfying", [
        "foo",
        "the assertion",
        "bar"
      ]);
    });

    it("should throw if called with a nested assertion", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );
      const nestedAssertion = {};
      nestedAssertion.__itPlaceholder = true;

      expect(
        () => {
          toSomething("foo", nestedAssertion);
        },
        "to throw",
        "unassessed: nested assertions are not supported by .toSomething()"
      );
    });
  });

  describe("with a double argument function", () => {
    const casedDefinitions = {
      toSomething: {
        assertionString: "the assertion",
        isNestingAllowed: false,
        typesOfValues: [new Set(), new Set()]
      }
    };

    it("should create a function", () => {
      const casedFunctions = createCasedFunctions(() => {}, casedDefinitions);

      expect(casedFunctions, "to exhaustively satisfy", {
        toSomething: expect.it("to be a function")
      });
    });

    it("should call down correctly", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );

      toSomething("foo", "bar", "baz");

      expect(fakeExpect, "to have a call exhaustively satisfying", [
        "foo",
        "the assertion",
        "bar",
        "baz"
      ]);
    });

    it("should throw if called with a nested assertion", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );
      const nestedAssertion = {};
      nestedAssertion.__itPlaceholder = true;

      expect(
        () => {
          toSomething("foo", "bar", nestedAssertion);
        },
        "to throw",
        "unassessed: nested assertions are not supported by .toSomething()"
      );
    });
  });

  describe("when nesting is allowed", () => {
    const casedDefinitions = {
      toSomething: {
        assertionString: "the assertion",
        isNestingAllowed: true,
        typesOfValues: [new Set()]
      }
    };

    it("should create a function", () => {
      const casedFunctions = createCasedFunctions(() => {}, casedDefinitions);

      expect(casedFunctions, "to exhaustively satisfy", {
        toSomething: expect.it("to be a function")
      });
    });

    it("should call down correctly", () => {
      const fakeExpect = sinon.stub().named("expect");
      const { toSomething } = createCasedFunctions(
        fakeExpect,
        casedDefinitions
      );

      toSomething("foo", "bar");

      expect(fakeExpect, "to have a call exhaustively satisfying", [
        "foo",
        "the assertion",
        "bar"
      ]);
    });

    describe("with an ItPlaceholder value", () => {
      const fakeItPlaceholder = {
        assertion: "the placeholder assertion",
        args: ["quux", "xuuq"]
      };
      fakeItPlaceholder.__itPlaceholder = true;

      it("should unpack an ItPlaceholder to expect.it()", () => {
        const fakeExpect = sinon.stub().named("expect");
        fakeExpect.it = sinon
          .stub()
          .named("expect.it")
          .returns(() => {});
        const { toSomething } = createCasedFunctions(
          fakeExpect,
          casedDefinitions
        );

        toSomething("foo", fakeItPlaceholder);

        expect(fakeExpect, "to have a call exhaustively satisfying", [
          "foo",
          "the assertion",
          expect.it("to be", fakeItPlaceholder)
        ]);
      });
    });
  });
});
