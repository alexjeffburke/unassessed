const expect = require("unexpected");
const unexpectedSinonPlugin = require("unexpected-sinon");

const assess = require("../../lib/unassessed");

describe("plugins/sinon", () => {
  let assessWithSinon;

  beforeEach(() => {
    assessWithSinon = assess.withUnexpectedPlugins(unexpectedSinonPlugin);
  });

  it("should expose assertions defined by the plugin", () => {
    const partialExpect = assessWithSinon(undefined);

    // complete assertion to avoid afterEach() hook
    partialExpect.toBeUndefined();

    const keys = Object.keys(partialExpect);
    const assessWithSinonKeys = keys.slice(
      // every index after the last core assertion
      keys.indexOf("toCallTheCallbackWithError") + 1
    );

    expect(assessWithSinonKeys, "to equal", [
      "wasCalled",
      "wasNotCalled",
      "threw",
      "wasCalledOn",
      "toHaveCallsExhaustivelySatisfying",
      "toHaveCallsSatisfying",
      "wasCalledOnce",
      "wasCalledTwice",
      "wasCalledThrice",
      "wasCalledTimes",
      "wasCalledWithNew",
      "givenCallOrder",
      "wasAlwaysCalledOn",
      "toHaveNoCallsExhaustivelySatisfying",
      "toHaveNoCallsSatisfying",
      "notToHaveCallsExhaustivelySatisfying",
      "notToHaveCallsSatisfying",
      "toHaveACallExhaustivelySatisfying",
      "toHaveACallSatisfying",
      "toHaveAllCallsExhaustivelySatisfying",
      "toHaveAllCallsSatisfying",
      "wasAlwaysCalledWithExactly",
      "wasAlwaysCalledWith",
      "wasCalledWithExactly",
      "wasCalledWith",
      "wasNeverCalledWith",
      "alwaysThrew"
    ]);
  });

  it("should expose .it. functions defined by the plugin", () => {
    const keys = Object.keys(assessWithSinon.it);
    const assessWithSinonKeys = keys.slice(
      // every index after the last core assertion
      keys.indexOf("toCallTheCallbackWithError") + 1
    );

    expect(assessWithSinonKeys, "to equal", [
      "wasCalled",
      "wasNotCalled",
      "threw",
      "wasCalledOn",
      "toHaveCallsExhaustivelySatisfying",
      "toHaveCallsSatisfying",
      "wasCalledOnce",
      "wasCalledTwice",
      "wasCalledThrice",
      "wasCalledTimes",
      "wasCalledWithNew",
      "givenCallOrder",
      "wasAlwaysCalledOn",
      "toHaveNoCallsExhaustivelySatisfying",
      "toHaveNoCallsSatisfying",
      "notToHaveCallsExhaustivelySatisfying",
      "notToHaveCallsSatisfying",
      "toHaveACallExhaustivelySatisfying",
      "toHaveACallSatisfying",
      "toHaveAllCallsExhaustivelySatisfying",
      "toHaveAllCallsSatisfying",
      "wasAlwaysCalledWithExactly",
      "wasAlwaysCalledWith",
      "wasCalledWithExactly",
      "wasCalledWith",
      "wasNeverCalledWith",
      "alwaysThrew"
    ]);
  });
});
