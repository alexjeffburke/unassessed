/* global weknowhow:false */
const unexpected =
  typeof weknowhow !== "undefined" ? weknowhow.expect : require("unexpected");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");

class ItPlaceholder {
  constructor(name, assertion, args) {
    this.name = name;
    this.assertion = assertion;
    this.args = args;
  }
}

ItPlaceholder.prototype.__itPlaceholder = true;

function createBoundFunctions(casedFuntions, subject) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    bound[fnName] = (...vals) => casedFuntions[fnName](subject, ...vals);
  });

  return bound;
}

function createItFunctions(casedDefinitions, casedFuntions) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    const { assertionString, isNestingAllowed } = casedDefinitions[fnName];
    if (isNestingAllowed) {
      // this assertion has a non-terminating form that takes
      // a value of type <assertion>. Given that .it. functions
      // must terminate an assertion call we will disallow this.
      bound[fnName] = (...vals) => {
        if (vals.length > 0 && vals[0].__itPlaceholder) {
          throw new Error(
            "Nested assertions are not supported with .it. functions."
          );
        }
        return new ItPlaceholder(fnName, assertionString, vals);
      };
      return;
    }

    bound[fnName] = (...vals) => {
      return new ItPlaceholder(fnName, assertionString, vals);
    };
  });

  return bound;
}

function _createUnexpempted(expect, frozenCasedFunctions) {
  expect = expect.clone();

  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);
  let casedFunctions;
  if (frozenCasedFunctions) {
    casedFunctions = frozenCasedFunctions(expect);
  } else {
    casedFunctions = createCasedFunctions(expect, casedDefinitions);
  }

  expect.addType({
    name: "itFunction",
    base: "expect.it",
    identify(f) {
      return (
        this.baseType.identify(f) && f.__itReference instanceof ItPlaceholder
      );
    },
    inspect(value, _, output, inspect) {
      const { assertion, args } = value.__itReference;

      const argsOutput = output.clone();
      args.forEach(arg => {
        argsOutput.sp().append(inspect(arg));
      });

      output.error(assertion).append(argsOutput);
    }
  });

  function unexempted(subject, ...rest) {
    if (rest.length > 0) {
      throw new Error("Expect takes at most one argument.");
    }

    return createBoundFunctions(casedFunctions, subject);
  }

  unexempted.it = createItFunctions(casedDefinitions, casedFunctions);

  return unexempted;
}

function createUnexpempted(expect) {
  return _createUnexpempted(expect, require("./casedFunctions"));
}

module.exports = createUnexpempted(unexpected);
