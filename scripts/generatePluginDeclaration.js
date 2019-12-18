const expect = require("unexpected");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");
const { identifyTypesOfValues } = processUnexpectedInstance;
const {
  populateTempalate,
  readTemplate
} = require("./generateTypescriptDeclaration");

function withoutSet(set1, set2) {
  const s = new Set();
  for (const item of set1) {
    if (!set2.has(item)) s.add(item);
  }
  return s;
}

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
    if (casedDefinitions[fnName]) {
      const typesOfValues = [];
      const typesOfValuesLeft = casedDefinitions[fnName].typesOfValues;
      const typesOfValuesRight = def.typesOfValues;

      for (const [index, typeSetRight] of typesOfValuesRight.entries()) {
        const typeSetLeft = typesOfValuesLeft[index] || new Set();

        typesOfValues.push(withoutSet(typeSetRight, typeSetLeft));
      }

      if (typesOfValues.every(s => s.size === 0)) {
        continue;
      } else {
        Object.assign(def, {
          ...identifyTypesOfValues(typesOfValues),
          typesOfValues
        });
      }
    }
    if (def.isMiddleRocket) continue;
    pluginCasedDefinitions[fnName] = def;
  }

  return populateTempalate(pluginCasedDefinitions, readTemplate("plugin"));
}

module.exports = generatePluginDeclaration;
