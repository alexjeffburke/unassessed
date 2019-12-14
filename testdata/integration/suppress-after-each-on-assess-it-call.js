const assess = require("../../lib/unassessed");

describe("suppress-after-each-on-assess-it-call", () => {
  it("should be identified", () => {
    assess(undefined).toSatisfy(assess.it());
  });
});
