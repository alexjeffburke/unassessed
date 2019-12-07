const unexpected = require("unexpected");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");

function createBoundFunctions(casedFuntions, subject) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    bound[fnName] = (...vals) => casedFuntions[fnName](subject, ...vals);
  });

  return bound;
}

function createItFunctions(expect, casedFuntions) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    const itHandler = casedFuntions[fnName];
    bound[fnName] = (...vals) => {
      const fn = expect.it(subject => itHandler(subject, ...vals));
      fn.__itFunction = true;
      return fn;
    };
  });

  return bound;
}

function _createUnexpempted(expect, casedFunctions) {
  if (!casedFunctions) {
    const assertions = prepareAssertions(expect);
    casedFunctions = createCasedFunctions(expect, assertions).casedFunctions;
  }

  function unexempted(subject, ...rest) {
    if (rest.length > 0) {
      throw new Error("Expect takes at most one argument.");
    }

    return createBoundFunctions(casedFunctions, subject);
  }

  unexempted.it = createItFunctions(expect, casedFunctions);

  return unexempted;
}

function createUnexpempted(expect) {
  return _createUnexpempted(expect, require("./casedFunctions")(expect));
}

module.exports = createUnexpempted(unexpected);
