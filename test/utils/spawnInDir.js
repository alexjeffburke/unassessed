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

module.exports = spawnInDir;
