const fs = require("fs");
const path = require("path");
const resolveFrom = require("resolve-from");

const generatePluginDeclaration = require("../../scripts/generatePluginDeclaration");

const readTemplate = templatePath =>
  fs.readFileSync(path.resolve(process.cwd(), templatePath), "utf8");

exports["unexpected-plugin"] = (
  cwd,
  { name: pluginName, outputFile, templateFile, typesMap: typeNamesToMap }
) => {
  const templateContent = templateFile ? readTemplate(templateFile) : null;
  const plugin = require(resolveFrom(cwd, pluginName));
  const output = generatePluginDeclaration(plugin, {
    templateContent,
    typeNamesToMap
  });

  if (outputFile) {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), output, "utf8");
  } else {
    console.log(output);
  }
};
