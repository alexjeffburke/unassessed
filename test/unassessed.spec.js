/* global expect:false, weknowhow:false */
const assess =
  typeof weknowhow !== "undefined"
    ? window.unassessed
    : require("../lib/unassessed");

const METHODS_LIST = [
  "notToBeTruthy",
  "toBeTruthy",
  "notToBe",
  "toBe",
  "notToBeTrue",
  "toBeTrue",
  "notToBeFalse",
  "toBeFalse",
  "notToBeFalsy",
  "toBeFalsy",
  "notToBeNull",
  "toBeNull",
  "notToBeUndefined",
  "toBeUndefined",
  "notToBeDefined",
  "toBeDefined",
  "notToBeNaN",
  "toBeNaN",
  "notToBeCloseTo",
  "toBeCloseTo",
  "notToBeA",
  "notToBeAn",
  "toBeA",
  "toBeAn",
  "notToBeOneOf",
  "toBeOneOf",
  "notToBeAnObject",
  "notToBeAnArray",
  "toBeAnObject",
  "toBeAnArray",
  "notToBeABoolean",
  "notToBeANumber",
  "notToBeAString",
  "notToBeAFunction",
  "notToBeARegexp",
  "notToBeARegex",
  "notToBeARegularExpression",
  "notToBeADate",
  "toBeABoolean",
  "toBeANumber",
  "toBeAString",
  "toBeAFunction",
  "toBeARegexp",
  "toBeARegex",
  "toBeARegularExpression",
  "toBeADate",
  "toBeTheEmptyString",
  "toBeAnEmptyString",
  "toBeTheEmptyArray",
  "toBeAnEmptyArray",
  "toMatch",
  "notToMatch",
  "notToHaveOwnProperty",
  "toHaveOwnProperty",
  "notToHaveEnumerableProperty",
  "notToHaveConfigurableProperty",
  "notToHaveWritableProperty",
  "toHaveEnumerableProperty",
  "toHaveConfigurableProperty",
  "toHaveWritableProperty",
  "notToHaveProperty",
  "toHaveProperty",
  "notToHaveOwnProperties",
  "notToHaveProperties",
  "toHaveOwnProperties",
  "toHaveProperties",
  "notToHaveLength",
  "toHaveLength",
  "notToBeEmpty",
  "toBeEmpty",
  "toNotOnlyHaveKeys",
  "toNotHaveKeys",
  "toOnlyHaveKeys",
  "toHaveKeys",
  "notToHaveKeys",
  "notToHaveKey",
  "toNotOnlyHaveKey",
  "toNotHaveKey",
  "toOnlyHaveKey",
  "toHaveKey",
  "notToContain",
  "toContain",
  "notToBeginWith",
  "toBeginWith",
  "notToStartWith",
  "toStartWith",
  "notToEndWith",
  "toEndWith",
  "notToBeFinite",
  "toBeFinite",
  "notToBeInfinite",
  "toBeInfinite",
  "notToBeWithin",
  "toBeWithin",
  "notToBeLessThan",
  "notToBeBelow",
  "toBeLessThan",
  "toBeBelow",
  "notToBeLessThanOrEqualTo",
  "toBeLessThanOrEqualTo",
  "notToBeGreaterThan",
  "notToBeAbove",
  "toBeGreaterThan",
  "toBeAbove",
  "notToBeGreaterThanOrEqualTo",
  "toBeGreaterThanOrEqualTo",
  "notToBePositive",
  "toBePositive",
  "notToBeNegative",
  "toBeNegative",
  "toEqual",
  "notToEqual",
  "toError",
  "toErrorWith",
  "notToError",
  "notToThrow",
  "toThrow",
  "toThrowError",
  "toThrowException",
  "toSatisfy",
  "toThrowA",
  "toThrowAn",
  "toHaveArity",
  "toHaveValuesExhaustivelySatisfying",
  "toHaveValuesSatisfying",
  "toBeAMapWhoseValuesExhaustivelySatisfy",
  "toBeAMapWhoseValuesSatisfy",
  "toBeAHashWhoseValuesExhaustivelySatisfy",
  "toBeAHashWhoseValuesSatisfy",
  "toBeAnObjectWhoseValuesExhaustivelySatisfy",
  "toBeAnObjectWhoseValuesSatisfy",
  "toHaveItemsExhaustivelySatisfying",
  "toHaveItemsSatisfying",
  "toBeAnArrayWhoseItemsExhaustivelySatisfy",
  "toBeAnArrayWhoseItemsSatisfy",
  "toHaveKeysSatisfying",
  "toBeAMapWhoseKeysSatisfy",
  "toBeAMapWhosePropertiesSatisfy",
  "toBeAHashWhoseKeysSatisfy",
  "toBeAHashWhosePropertiesSatisfy",
  "toBeAnObjectWhoseKeysSatisfy",
  "toBeAnObjectWhosePropertiesSatisfy",
  "notToHaveAValueExhaustivelySatisfying",
  "notToHaveAValueSatisfying",
  "toHaveAValueExhaustivelySatisfying",
  "toHaveAValueSatisfying",
  "notToHaveAnItemExhaustivelySatisfying",
  "notToHaveAnItemSatisfying",
  "toHaveAnItemExhaustivelySatisfying",
  "toHaveAnItemSatisfying",
  "toBeCanonical",
  "toHaveMessage",
  "toExhaustivelySatisfy",
  "notToExhaustivelySatisfy",
  "notToSatisfy",
  "toBeRejected",
  "toBeRejectedWith",
  "toBeRejectedWithErrorExhaustivelySatisfying",
  "toBeRejectedWithErrorSatisfying",
  "toBeFulfilled",
  "toBeFulfilledWith",
  "toBeFulfilledWithValueExhaustivelySatisfying",
  "toBeFulfilledWithValueSatisfying",
  "toCallTheCallback",
  "toCallTheCallbackWithoutError",
  "toCallTheCallbackWithError"
];

describe("unassessed", () => {
  it("should be a function", () => {
    expect(assess, "to be a function");
  });

  it("should throw if given more than one argument", () => {
    expect(
      () => {
        assess(undefined, undefined);
      },
      "to throw",
      "unassessed: at most one subject argument accepted"
    );
  });

  it("should support assertions", () => {
    const partialExpect = assess(undefined);

    // complete assertion to avoid afterEach() hook
    partialExpect.toBeUndefined();

    expect(Object.keys(partialExpect), "to equal", METHODS_LIST);
  });

  it("should throw .it is called directly", () => {
    expect(
      () => {
        assess.it();
      },
      "to throw",
      "unassessed: asssess.it was called directly. Please use its methods instead."
    );
  });

  it("should support .it.", () => {
    const functions = assess.it;

    expect(Object.keys(functions), "to equal", [
      "notToBeTruthy",
      "toBeTruthy",
      "notToBe",
      "toBe",
      "notToBeTrue",
      "toBeTrue",
      "notToBeFalse",
      "toBeFalse",
      "notToBeFalsy",
      "toBeFalsy",
      "notToBeNull",
      "toBeNull",
      "notToBeUndefined",
      "toBeUndefined",
      "notToBeDefined",
      "toBeDefined",
      "notToBeNaN",
      "toBeNaN",
      "notToBeCloseTo",
      "toBeCloseTo",
      "notToBeA",
      "notToBeAn",
      "toBeA",
      "toBeAn",
      "notToBeOneOf",
      "toBeOneOf",
      "notToBeAnObject",
      "notToBeAnArray",
      "toBeAnObject",
      "toBeAnArray",
      "notToBeABoolean",
      "notToBeANumber",
      "notToBeAString",
      "notToBeAFunction",
      "notToBeARegexp",
      "notToBeARegex",
      "notToBeARegularExpression",
      "notToBeADate",
      "toBeABoolean",
      "toBeANumber",
      "toBeAString",
      "toBeAFunction",
      "toBeARegexp",
      "toBeARegex",
      "toBeARegularExpression",
      "toBeADate",
      "toBeTheEmptyString",
      "toBeAnEmptyString",
      "toBeTheEmptyArray",
      "toBeAnEmptyArray",
      "toMatch",
      "notToMatch",
      "notToHaveOwnProperty",
      "toHaveOwnProperty",
      "notToHaveEnumerableProperty",
      "notToHaveConfigurableProperty",
      "notToHaveWritableProperty",
      "toHaveEnumerableProperty",
      "toHaveConfigurableProperty",
      "toHaveWritableProperty",
      "notToHaveProperty",
      "toHaveProperty",
      "notToHaveOwnProperties",
      "notToHaveProperties",
      "toHaveOwnProperties",
      "toHaveProperties",
      "notToHaveLength",
      "toHaveLength",
      "notToBeEmpty",
      "toBeEmpty",
      "toNotOnlyHaveKeys",
      "toNotHaveKeys",
      "toOnlyHaveKeys",
      "toHaveKeys",
      "notToHaveKeys",
      "notToHaveKey",
      "toNotOnlyHaveKey",
      "toNotHaveKey",
      "toOnlyHaveKey",
      "toHaveKey",
      "notToContain",
      "toContain",
      "notToBeginWith",
      "toBeginWith",
      "notToStartWith",
      "toStartWith",
      "notToEndWith",
      "toEndWith",
      "notToBeFinite",
      "toBeFinite",
      "notToBeInfinite",
      "toBeInfinite",
      "notToBeWithin",
      "toBeWithin",
      "notToBeLessThan",
      "notToBeBelow",
      "toBeLessThan",
      "toBeBelow",
      "notToBeLessThanOrEqualTo",
      "toBeLessThanOrEqualTo",
      "notToBeGreaterThan",
      "notToBeAbove",
      "toBeGreaterThan",
      "toBeAbove",
      "notToBeGreaterThanOrEqualTo",
      "toBeGreaterThanOrEqualTo",
      "notToBePositive",
      "toBePositive",
      "notToBeNegative",
      "toBeNegative",
      "toEqual",
      "notToEqual",
      "toError",
      "toErrorWith",
      "notToError",
      "notToThrow",
      "toThrow",
      "toThrowError",
      "toThrowException",
      "toSatisfy",
      "toThrowA",
      "toThrowAn",
      "toHaveArity",
      "toHaveValuesExhaustivelySatisfying",
      "toHaveValuesSatisfying",
      "toBeAMapWhoseValuesExhaustivelySatisfy",
      "toBeAMapWhoseValuesSatisfy",
      "toBeAHashWhoseValuesExhaustivelySatisfy",
      "toBeAHashWhoseValuesSatisfy",
      "toBeAnObjectWhoseValuesExhaustivelySatisfy",
      "toBeAnObjectWhoseValuesSatisfy",
      "toHaveItemsExhaustivelySatisfying",
      "toHaveItemsSatisfying",
      "toBeAnArrayWhoseItemsExhaustivelySatisfy",
      "toBeAnArrayWhoseItemsSatisfy",
      "toHaveKeysSatisfying",
      "toBeAMapWhoseKeysSatisfy",
      "toBeAMapWhosePropertiesSatisfy",
      "toBeAHashWhoseKeysSatisfy",
      "toBeAHashWhosePropertiesSatisfy",
      "toBeAnObjectWhoseKeysSatisfy",
      "toBeAnObjectWhosePropertiesSatisfy",
      "notToHaveAValueExhaustivelySatisfying",
      "notToHaveAValueSatisfying",
      "toHaveAValueExhaustivelySatisfying",
      "toHaveAValueSatisfying",
      "notToHaveAnItemExhaustivelySatisfying",
      "notToHaveAnItemSatisfying",
      "toHaveAnItemExhaustivelySatisfying",
      "toHaveAnItemSatisfying",
      "toBeCanonical",
      "toHaveMessage",
      "toExhaustivelySatisfy",
      "notToExhaustivelySatisfy",
      "notToSatisfy",
      "toBeRejected",
      "toBeRejectedWith",
      "toBeRejectedWithErrorExhaustivelySatisfying",
      "toBeRejectedWithErrorSatisfying",
      "toBeFulfilled",
      "toBeFulfilledWith",
      "toBeFulfilledWithValueExhaustivelySatisfying",
      "toBeFulfilledWithValueSatisfying",
      "toCallTheCallback",
      "toCallTheCallbackWithoutError",
      "toCallTheCallbackWithError"
    ]);
  });

  describe("fromInstance()", () => {
    it("should support assertions", () => {
      const newAssess = assess.fromInstance(expect.clone());
      const partialExpect = newAssess(undefined);

      // complete assertion to avoid afterEach() hook
      partialExpect.toBeUndefined();

      expect(
        Object.keys(partialExpect),
        "to equal",
        METHODS_LIST.concat(["toEqualSnapshot", "toInspectAsSnapshot"])
      );
    });
  });

  describe("setOutputWidth()", () => {
    it("should throw if not a number", () => {
      expect(
        () => {
          assess.setOutputWidth(null);
        },
        "to throw",
        "unassessed: invalid output width"
      );
    });

    it("should throw if less than 1", () => {
      expect(
        () => {
          assess.setOutputWidth(0);
        },
        "to throw",
        "unassessed: invalid output width"
      );
    });

    it("should not throw if valid", () => {
      const newAssess = assess.fromInstance(expect);

      expect(() => {
        newAssess.setOutputWidth(100);
      }, "not to throw");
    });
  });

  describe('"to be truthy"', () => {
    it("should allow assertion", () => {
      expect(() => {
        assess("foo").toBeTruthy();
      }, "not to throw");
    });
  });

  describe('"to be within"', () => {
    it("should allow assertion", () => {
      expect(() => {
        assess(3).toBeWithin(2, 4);
      }, "not to throw");
    });
  });

  describe('"to equal"', () => {
    it("should allow an assertion", () => {
      expect(() => {
        assess("foo").toEqual("foo");
      }, "not to throw");
    });

    it("should allow a negated assertion", () => {
      expect(() => {
        assess("foo").notToEqual("bar");
      }, "not to throw");
    });

    it("should allow a nested assertion", () => {
      expect(
        () => {
          assess("foo").notToEqual(assess.it.toEqual("foo"));
        },
        "to throw",
        "unassessed: nested assertions are not supported by .notToEqual()"
      );
    });
  });

  describe('"to satisfy"', () => {
    it("should allow a nested assertion within a spec", () => {
      expect(() => {
        assess({
          foo: 1,
          bar: "quux",
          relatedThings: ["buses", "planes", "trains"]
        }).toSatisfy({
          relatedThings: assess.it.notToBeEmpty()
        });
      }, "not to throw");
    });

    it("should render a nice diff (nested no args)", () => {
      const assessWithWidth = assess.fromInstance(expect);
      assessWithWidth.setOutputWidth(150);

      expect(
        () => {
          assessWithWidth({
            foo: 1,
            bar: "quux",
            relatedThings: ["buses", "planes", "trains"]
          }).toSatisfy({
            relatedThings: assess.it.toBeEmpty()
          });
        },
        "to throw",
        expect.it(error => {
          const message = error.getErrorMessage("text").toString();

          expect(
            message,
            "to equal snapshot",
            expect.unindent`
            expected { foo: 1, bar: 'quux', relatedThings: [ 'buses', 'planes', 'trains' ] } to satisfy { relatedThings: assess.it.toBeEmpty() }

            {
              foo: 1,
              bar: 'quux',
              relatedThings:
                [ 'buses', 'planes', 'trains' ] // should satisfy assess.it.toBeEmpty()
                                                //
                                                // should be empty
            }
          `
          );
        })
      );
    });

    it("should render a nice diff (nested singular arg)", () => {
      const assessWithWidth = assess.fromInstance(expect);
      assessWithWidth.setOutputWidth(150);

      expect(
        () => {
          assessWithWidth({
            foo: 1,
            bar: "quux",
            relatedThings: ["buses", "planes", "trains"]
          }).toSatisfy({
            relatedThings: assess.it.toHaveLength(1)
          });
        },
        "to throw",
        expect.it(error => {
          const message = error.getErrorMessage("text").toString();

          expect(
            message,
            "to equal snapshot",
            expect.unindent`
            expected { foo: 1, bar: 'quux', relatedThings: [ 'buses', 'planes', 'trains' ] } to satisfy { relatedThings: assess.it.toHaveLength(1) }

            {
              foo: 1,
              bar: 'quux',
              relatedThings:
                [ 'buses', 'planes', 'trains' ] // should satisfy assess.it.toHaveLength(1)
                                                //
                                                // should have length 1
                                                //   expected 3 to be 1
            }
          `
          );
        })
      );
    });

    it("should render a nice diff (nested double arg)", () => {
      const assessWithWidth = assess.fromInstance(expect);
      assessWithWidth.setOutputWidth(150);

      expect(
        () => {
          assessWithWidth({
            foo: 1,
            bar: "quux",
            relatedThings: ["buses", "planes", "trains"]
          }).toSatisfy({
            foo: assess.it.toBeWithin(2, 3)
          });
        },
        "to throw",
        expect.it(error => {
          const message = error.getErrorMessage("text").toString();

          expect(
            message,
            "to equal snapshot",
            expect.unindent`
            expected { foo: 1, bar: 'quux', relatedThings: [ 'buses', 'planes', 'trains' ] } to satisfy { foo: assess.it.toBeWithin(2, 2) }

            {
              foo: 1, // should satisfy assess.it.toBeWithin(2, 2)
                      //
                      // should be within 2..3
              bar: 'quux',
              relatedThings: [ 'buses', 'planes', 'trains' ]
            }
          `
          );
        })
      );
    });
  });

  describe('"to have items satisfying"', () => {
    it("should allow a nested singular value assertion", () => {
      expect(() => {
        assess(["foo", "it", "do"]).toHaveAnItemSatisfying(
          assess.it.toHaveLength(3)
        );
      }, "not to throw");
    });

    it("should allow a nested dual value assertion", () => {
      expect(() => {
        assess([1, 3, 5]).toHaveAnItemSatisfying(assess.it.toBeWithin(2, 4));
      }, "not to throw");
    });
  });

  describe("when using nested assertions", () => {
    it("should throw if the function does not terminate the chain", () => {
      expect(
        () => {
          assess([[1, 3, 5]]).toHaveAnItemSatisfying(
            assess.it.toHaveAnItemSatisfying(assess.it.toHaveAnItemSatisfying())
          );
        },
        "to throw",
        "unassessed: nested assertions are not supported with .it. functions."
      );
    });

    it("should render a nice diff", () => {
      expect(
        () => {
          assess(["so", "it", "do"]).toHaveAnItemSatisfying(
            assess.it.toHaveLength(3)
          );
        },
        "to throw",
        "expected [ 'so', 'it', 'do' ] to have an item satisfying to have length 3"
      );
    });
  });
});
