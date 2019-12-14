const expect = require("unexpected");
const path = require("path");
const spawn = require("child_process").spawn;

function spawnInDir(cwd, bin, args) {
  const spawnedCli = spawn(bin, args, { cwd });

  const p = new Promise((resolve, reject) => {
    let sawExit = false;
    let stdout = "";
    let stderr = "";

    spawnedCli.stdout.on("data", chunk => {
      stdout += chunk.toString("utf8");
    });

    spawnedCli.stderr.on("data", chunk => {
      stderr += chunk.toString("utf8");
    });

    const makeError = code => {
      const error = new Error("spawnCli error");
      error.code = code;
      error.stdout = stdout;
      error.stderr = stderr;
      return error;
    };

    spawnedCli.on("error", () => {
      if (sawExit) {
        return;
      }

      sawExit = true;

      reject(makeError(null));
    });

    spawnedCli.on("exit", code => {
      if (sawExit) {
        return;
      }

      sawExit = true;

      if (code) {
        reject(makeError(code));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });

  p._spawn = spawnedCli;

  return p;
}

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
});
