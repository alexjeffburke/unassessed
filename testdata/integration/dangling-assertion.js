const assess = require("../../lib/unassessed");

describe("dangling-assertion", () => {
  it("should be identified", () => {
    assess();
  });
});
