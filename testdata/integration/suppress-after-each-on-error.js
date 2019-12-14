const assess = require("../../lib/unassessed");

describe("suppress-after-each-on-error", () => {
  it("should be identified", () => {
    assess();

    assess(undefined).toBeDefined();
  });
});
