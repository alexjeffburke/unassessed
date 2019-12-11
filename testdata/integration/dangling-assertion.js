const unexempted = require("../../lib/unexempted");

describe("dangling-assertion", () => {
  it("should be identified", () => {
    unexempted();
  });
});
