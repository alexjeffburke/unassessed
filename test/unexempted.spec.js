/* global expect:false, weknowhow:false */
const unexempted =
  typeof weknowhow !== "undefined"
    ? window.unexempted
    : require("../lib/unexempted");

describe("unexempted", () => {
  it("should be a function", () => {
    expect(unexempted, "to be a function");
  });

  it("should support assertions", () => {
    const partialExpect = unexempted(undefined);

    expect(Object.keys(partialExpect), "to equal", [
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

  it("should support .it.", () => {
    const functions = unexempted.it;

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

  describe('"to be truthy"', () => {
    it("should allow assertion", () => {
      expect(() => {
        unexempted("foo").toBeTruthy();
      }, "not to throw");
    });
  });

  describe('"to be within"', () => {
    it("should allow assertion", () => {
      expect(() => {
        unexempted(3).toBeWithin(2, 4);
      }, "not to throw");
    });
  });

  describe('"to equal"', () => {
    it("should allow assertion", () => {
      expect(() => {
        unexempted("foo").toEqual("foo");
      }, "not to throw");
    });

    it("should allow negated assertion", () => {
      expect(() => {
        unexempted("foo").notToEqual("bar");
      }, "not to throw");
    });

    it("should now allow a nested assertion", () => {
      expect(
        () => {
          unexempted("foo").notToEqual(unexempted.it.toEqual("foo"));
        },
        "to throw",
        "Nested assertions are not supported by .notToEqual()"
      );
    });
  });

  describe('"to have items satisfying"', () => {
    it("should allow a nested singular value assertion", () => {
      expect(() => {
        unexempted(["foo", "it", "do"]).toHaveAnItemSatisfying(
          unexempted.it.toHaveLength(3)
        );
      }, "not to throw");
    });

    it("should allow a nested dual value assertion", () => {
      expect(() => {
        unexempted([1, 3, 5]).toHaveAnItemSatisfying(
          unexempted.it.toBeWithin(2, 4)
        );
      }, "not to throw");
    });
  });
});
