const expect = require("unexpected")
  .clone()
  .use(require("unexpected-dom"));

const assess = require("../../lib/unassessed");

describe("plugins/dom", () => {
  let assessWithDom;

  beforeEach(() => {
    assessWithDom = assess.fromInstance(expect);
  });

  it("should expose assertions defined by the plugin", () => {
    const partialExpect = assessWithDom(undefined);

    // complete assertion to avoid afterEach() hook
    partialExpect.toBeUndefined();

    const keys = Object.keys(partialExpect);
    const assessWithDomKeys = keys.slice(
      // every index after the last core assertion
      keys.indexOf("toCallTheCallbackWithError") + 1
    );

    expect(assessWithDomKeys, "to equal", [
      "toHaveClass",
      "toHaveClasses",
      "toOnlyHaveClass",
      "toOnlyHaveClasses",
      "notToHaveClass",
      "notToHaveClasses",
      "toOnlyHaveAttribute",
      "toOnlyHaveAttributes",
      "toHaveAttribute",
      "toHaveAttributes",
      "notToHaveAttribute",
      "notToHaveAttributes",
      "toHaveNoChild",
      "toHaveNoChildren",
      "toHaveChild",
      "toHaveChildren",
      "toHaveText",
      "toContainNoElementsMatching",
      "toContainElementsMatching",
      "notToContainElementsMatching",
      "notToContainTestId",
      "toContainTestId",
      "notToHaveTestId",
      "toHaveTestId"
    ]);
  });

  it("should expose .it. functions defined by the plugin", () => {
    const keys = Object.keys(assessWithDom.it);
    const assessWithDomKeys = keys.slice(
      // every index after the last core assertion
      keys.indexOf("toCallTheCallbackWithError") + 1
    );

    expect(assessWithDomKeys, "to equal", [
      "toHaveClass",
      "toHaveClasses",
      "toOnlyHaveClass",
      "toOnlyHaveClasses",
      "notToHaveClass",
      "notToHaveClasses",
      "toOnlyHaveAttribute",
      "toOnlyHaveAttributes",
      "toHaveAttribute",
      "toHaveAttributes",
      "notToHaveAttribute",
      "notToHaveAttributes",
      "toHaveNoChild",
      "toHaveNoChildren",
      "toHaveChild",
      "toHaveChildren",
      "toHaveText",
      "toContainNoElementsMatching",
      "toContainElementsMatching",
      "notToContainElementsMatching",
      "notToContainTestId",
      "toContainTestId",
      "notToHaveTestId",
      "toHaveTestId"
    ]);
  });
});
