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
      "whenQueriedForFirst",
      "whenQueriedFor",
      "queriedForFirst",
      "queriedFor",
      "whenQueriedForTestId",
      "queriedForTestId",
      "toContainNoElementsMatching",
      "toContainElementsMatching",
      "notToContainElementsMatching",
      "notToContainTestId",
      "toContainTestId",
      "notToHaveTestId",
      "toHaveTestId",
      "whenParsedAsHtmlFragment",
      "whenParsedAsHtml",
      "whenParsedAsHTMLFragment",
      "whenParsedAsHTML",
      "parsedAsHtmlFragment",
      "parsedAsHtml",
      "parsedAsHTMLFragment",
      "parsedAsHTML",
      "whenParsedAsXml",
      "whenParsedAsXML",
      "parsedAsXml",
      "parsedAsXML"
    ]);
  });
});
