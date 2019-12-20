const expect = require("unexpected");
const path = require("path");

const spawnInDir = require("../utils/spawnInDir");

const MOCHA_BIN = path.join(
  __dirname,
  "..",
  "..",
  "node_modules",
  ".bin",
  "mocha"
);
const TESTDATA = path.join(__dirname, "..", "..", "testdata");
const TESTDATA_INTEGRATION = path.join(TESTDATA, "integration");

describe("integration/mocha", () => {
  it("should catch a dangling assertion in afterEach", () => {
    const testFile = path.join(TESTDATA_INTEGRATION, "dangling-assertion.js");

    return expect(
      spawnInDir(TESTDATA_INTEGRATION, MOCHA_BIN, [testFile]),
      "to be rejected"
    ).then(({ stdout }) =>
      expect(
        stdout,
        "to contain",
        '1) "after each" hook for "should be identified"'
      )
    );
  });

  it("should catch a dangling first assertion in afterEach", () => {
    const testFile = path.join(
      TESTDATA_INTEGRATION,
      "dangling-first-assertion.js"
    );

    return expect(
      spawnInDir(TESTDATA_INTEGRATION, MOCHA_BIN, [testFile]),
      "to be rejected"
    ).then(({ stdout }) =>
      expect(
        stdout,
        "to contain",
        '1) "after each" hook for "should be identified"'
      )
    );
  });

  it("should catch a dangling second assertion in afterEach", () => {
    const testFile = path.join(
      TESTDATA_INTEGRATION,
      "dangling-second-assertion.js"
    );

    return expect(
      spawnInDir(TESTDATA_INTEGRATION, MOCHA_BIN, [testFile]),
      "to be rejected"
    ).then(({ stdout }) =>
      expect(
        stdout,
        "to contain",
        '1) "after each" hook for "should be identified"'
      )
    );
  });

  it("should suppress afterEach error on an assertion error", () => {
    const testFile = path.join(
      TESTDATA_INTEGRATION,
      "suppress-after-each-on-error.js"
    );

    return expect(
      spawnInDir(TESTDATA_INTEGRATION, MOCHA_BIN, [testFile]),
      "to be rejected"
    ).then(({ stdout }) =>
      expect(
        stdout,
        "not to contain",
        '1) "after each" hook for "should be identified"'
      ).and("to contain", "should be identified:")
    );
  });

  it("should suppress afterEach error on an assess.it call error", () => {
    const testFile = path.join(
      TESTDATA_INTEGRATION,
      "suppress-after-each-on-assess-it-call.js"
    );

    return expect(
      spawnInDir(TESTDATA_INTEGRATION, MOCHA_BIN, [testFile]),
      "to be rejected"
    ).then(({ stdout, stderr }) => {
      expect(
        stdout,
        "not to contain",
        '"after each" hook for "should be identified"'
      ).and(
        "to contain",
        "Error: unassessed: asssess.it was called directly. Please use its methods instead."
      );
    });
  });
});
