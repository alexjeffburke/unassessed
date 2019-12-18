const expect = require("unexpected");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");
const {
  populateTempalate,
  readTemplate
} = require("./generateTypescriptDeclaration");

function generatePluginDeclaration(plugin) {
  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);

  const expectWithPlugin = expect.clone().use(plugin);
  const assertionsWithPlugin = prepareAssertions(expectWithPlugin);
  const casedDefinitionsWithPlugin = processUnexpectedInstance(
    expectWithPlugin,
    assertionsWithPlugin
  );

  const pluginCasedDefinitions = {};
  for (const [fnName, def] of Object.entries(casedDefinitionsWithPlugin)) {
    if (casedDefinitions[fnName]) continue;
    if (def.isMiddleRocket) continue;
    pluginCasedDefinitions[fnName] = def;
  }

  return populateTempalate(pluginCasedDefinitions, readTemplate("plugin"));
}

module.exports = generatePluginDeclaration;
