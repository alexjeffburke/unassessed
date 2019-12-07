const unexpected = require("unexpected");

const createCasedFunctions = require("./createCasedFunctions");
const prepareAssertions = require("./prepareAssertions");

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

function createUnexpempted(expect) {
  const assertions = prepareAssertions(expect);
  const { casedFunctions } = createCasedFunctions(expect, assertions);

  function unexempted(subject, ...rest) {
    if (rest.length > 0) {
      throw new Error("Expect takes at most one argument.");
    }

    return createBoundFunctions(casedFunctions, subject);
  }

  unexempted.it = createItFunctions(expect, casedFunctions);

  return unexempted;
}

module.exports = createUnexpempted(unexpected);
