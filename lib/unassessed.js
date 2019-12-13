/* global weknowhow:false, afterEach: false */
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

function createBoundFunctions(casedDefinitions, casedFuntions, subject) {
  const bound = {};

  Object.keys(casedFuntions).forEach(fnName => {
    bound[fnName] = (...vals) => casedFuntions[fnName](subject, ...vals);
  });

  return bound;
}

let afterEachAttached = false;
let onAfterEach = null;

function ensureAfterEachIsRegistered() {
  if (typeof afterEach === "function" && !afterEachAttached) {
    afterEachAttached = true;
    afterEach(function() {
      const callable = onAfterEach;
      onAfterEach = null;
      if (callable) callable();
    });
  }
}

function createItFunctions(casedDefinitions, casedFuntions, decrementFn) {
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
            "unassessed: nested assertions are not supported with .it. functions."
          );
        }
        decrementFn();
        return new ItPlaceholder(fnName, assertionString, vals);
      };
      return;
    }

    bound[fnName] = (...vals) => {
      decrementFn();
      return new ItPlaceholder(fnName, assertionString, vals);
    };
  });

  return bound;
}

function _createUnexpempted(expect, makeCasedFunctions) {
  expect = expect.clone();

  let executing = false;
  let executingAssertionCount = 0;

  expect.hook(next => {
    return function expectWatcher(context, args) {
      const [, , ...rest] = args;
      if (rest.length === 1 && rest[0] instanceof ItPlaceholder) {
        let value = rest[0];
        const { assertion: itAssertion, args: itArgs } = value;
        value = expect.it(thing => expect(thing, itAssertion, ...itArgs));
        value.__itReference = rest[0];
        // replace current value argument with the unpacked ItPlaceholder
        args.splice(2, 1, value);
      }

      executingAssertionCount -= 1;

      if (executing) {
        return next(context, args);
      }

      executing = true;

      let returnValue;
      try {
        returnValue = next(context, args);
      } catch (error) {
        executing = false;
        throw error;
      }
      if (returnValue.isPending()) {
        returnValue.finally(() => (executing = false));
      }
      return returnValue;
    };
  });

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

  makeCasedFunctions = makeCasedFunctions || createCasedFunctions;
  const assertions = prepareAssertions(expect);
  const casedDefinitions = processUnexpectedInstance(expect, assertions);
  const casedFunctions = makeCasedFunctions(expect, casedDefinitions);

  function unassessed(subject, ...rest) {
    if (rest.length > 0) {
      throw new Error("unassessed: at most one subject argument accepted");
    }

    executingAssertionCount += 1;

    if (!onAfterEach) {
      onAfterEach = function() {
        const currentAssertionCount = executingAssertionCount;
        executingAssertionCount = 0;
        if (currentAssertionCount > 0) {
          throw new Error("unassessed: dangling assertion created");
        }
      };
    }

    return createBoundFunctions(casedDefinitions, casedFunctions, subject);
  }

  unassessed.fromInstance = expect => {
    return _createUnexpempted(expect);
  };

  unassessed.it = createItFunctions(casedDefinitions, casedFunctions, () => {
    executingAssertionCount -= 1;
  });

  ensureAfterEachIsRegistered();

  return unassessed;
}

function createUnexpempted(expect) {
  return _createUnexpempted(expect, require("./casedFunctions"));
}

module.exports = createUnexpempted(unexpected);
