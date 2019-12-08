/* global weknowhow:false */
const unexpected =
  typeof weknowhow !== "undefined" ? weknowhow.expect : require("unexpected");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");

function createBoundFunctions(casedFuntions, subject) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    bound[fnName] = (...vals) => casedFuntions[fnName](subject, ...vals);
  });

  return bound;
}

function createItFunctions(expect, casedDefinitions, casedFuntions) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    const itHandler = casedFuntions[fnName];

    const { isNestingAllowed } = casedDefinitions[fnName];
    if (isNestingAllowed) {
      // this assertion has a non-terminating form that takes
      // a value of type <assertion>. Given that .it. functions
      // must terminate an assertion call we will disallow this.
      bound[fnName] = (...vals) => {
        if (vals.length > 0 && vals[0].__itFunction) {
          throw new Error(
            "Nested assertions are not supported with .it. functions."
          );
        }
        const fn = expect.it(subject => itHandler(subject, ...vals));
        fn.__itFunction = true;
        return fn;
      };
      return;
    }

    bound[fnName] = (...vals) => {
      const fn = expect.it(subject => itHandler(subject, ...vals));
      fn.__itFunction = true;
      return fn;
    };
  });

  return bound;
}

function _createUnexpempted(expect, frozenCasedFunctions) {
  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);
  let casedFunctions;
  if (frozenCasedFunctions) {
    casedFunctions = frozenCasedFunctions(expect);
  } else {
    casedFunctions = createCasedFunctions(expect, casedDefinitions);
  }

  function unexempted(subject, ...rest) {
    if (rest.length > 0) {
      throw new Error("Expect takes at most one argument.");
    }

    return createBoundFunctions(casedFunctions, subject);
  }

  unexempted.it = createItFunctions(expect, casedDefinitions, casedFunctions);

  return unexempted;
}

function createUnexpempted(expect) {
  return _createUnexpempted(expect, require("./casedFunctions"));
}

module.exports = createUnexpempted(unexpected);
