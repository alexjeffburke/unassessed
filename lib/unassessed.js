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

function attachBoundFunctions(ctx, casedDefinitions, casedFuntions, subject) {
  Object.keys(casedFuntions).forEach(fnName => {
    const definition = casedDefinitions[fnName];

    if (definition.isMiddleRocket) {
      return;
    }

    ctx[fnName] = (...vals) => casedFuntions[fnName](subject, ...vals);
  });
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

function attachItFunctions(ctx, casedDefinitions, casedFuntions, decrementFn) {
  Object.keys(casedFuntions).forEach(fnName => {
    const {
      assertionString,
      isMiddleRocket,
      isNestingAllowed
    } = casedDefinitions[fnName];

    if (isMiddleRocket) {
      return;
    }

    if (isNestingAllowed) {
      // this assertion has a non-terminating form that takes
      // a value of type <assertion>. Given that .it. functions
      // must terminate an assertion call we will disallow this.
      ctx[fnName] = (...vals) => {
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

    ctx[fnName] = (...vals) => {
      decrementFn();
      return new ItPlaceholder(fnName, assertionString, vals);
    };
  });
}

function _createUnexpempted(expect, makeCasedFunctions) {
  expect = expect.clone();

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

      let returnValue;
      try {
        returnValue = next(context, args);
      } catch (error) {
        executingAssertionCount = 0;
        throw error;
      }
      if (returnValue.isPending()) {
        returnValue.finally(() => (executingAssertionCount = 0));
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

    const assess = {};

    attachBoundFunctions(assess, casedDefinitions, casedFunctions, subject);

    return assess;
  }

  unassessed.fromInstance = expect => {
    return _createUnexpempted(expect);
  };

  function assessIt() {
    executingAssertionCount = 0;

    throw new Error(
      "unassessed: asssess.it was called directly. Please use its methods instead."
    );
  }

  attachItFunctions(assessIt, casedDefinitions, casedFunctions, () => {
    executingAssertionCount -= 1;
  });

  unassessed.it = assessIt;

  ensureAfterEachIsRegistered();

  return unassessed;
}

function createUnexpempted(expect) {
  return _createUnexpempted(expect, require("./casedFunctions"));
}

module.exports = createUnexpempted(unexpected);
