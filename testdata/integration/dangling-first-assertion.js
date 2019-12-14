const assess = require("../../lib/unassessed");

describe("dangling-second-assertion", () => {
  it("should be identified", () => {
    assess();

    assess(undefined).toBeUndefined();
  });
});
