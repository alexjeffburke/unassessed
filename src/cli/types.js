const fs = require("fs");
const path = require("path");
const resolveFrom = require("resolve-from");

const generatePluginDeclaration = require("../../scripts/generatePluginDeclaration");

exports["unexpected-plugin"] = (cwd, { name: pluginName, outputFile }) => {
  const plugin = require(resolveFrom(cwd, pluginName));
  const output = generatePluginDeclaration(plugin);

  if (outputFile) {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), output, "utf8");
  } else {
    console.log(output);
  }
};
