/* global weknowhow:false, afterEach: false */
const unexpected =
  typeof weknowhow !== "undefined" ? weknowhow.expect : require("unexpected");

const createCasedFunctions = require("../src/createCasedFunctions");
const prepareAssertions = require("../src/prepareAssertions");
const processUnexpectedInstance = require("../src/processUnexpectedInstance");

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

function unwrapItPlaceholder(expect, itPlaceholder) {
  const { assertion: itAssertion, args: itArgs } = itPlaceholder;
  let value; // eslint-disable-next-line prefer-const
  value = expect.it(thing => expect(thing, itAssertion, ...itArgs));
  value.__itReference = itPlaceholder;
  return value;
}

function _createAssessed(expect, makeCasedFunctions) {
  let executingAssertionCount = 0;

  expect.hook(next => {
    return function expectWatcher(context, args) {
      const [, , ...rest] = args;
      if (rest.length === 1 && rest[0] instanceof ItPlaceholder) {
        // replace current value argument with the unwapped ItPlaceholder
        args.splice(2, 1, unwrapItPlaceholder(expect, rest[0]));
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

  expect.addType({
    name: "ItPlaceholder",
    base: "wrapperObject",
    identify(v) {
      return v instanceof ItPlaceholder;
    },
    inspect(value, depth, output, inspect) {
      output.append(this.prefix(output.clone(), value));
      if (value.args.length > 0) {
        value.args.forEach((arg, index) => {
          if (index > 0) {
            output.text(", ");
          }
          output.appendInspected(...value.args);
        });
      }
      output.append(this.suffix(output.clone(), value));
      return output;
    },
    unwrap(value) {
      return unwrapItPlaceholder(expect, value);
    },
    prefix(output, value) {
      const { name } = value;
      return output.text(`assess.it.${name}(`);
    },
    suffix(output) {
      return output.text(")");
    }
  });

  expect.addAssertion(
    "<any> to [exhaustively] satisfy <ItPlaceholder>",
    (expect, subject, value) => {
      const valueType = expect.argTypes[0];

      return expect(
        subject,
        "to [exhaustively] satisfy",
        valueType.unwrap(value)
      );
    }
  );

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

  unassessed.setOutputWidth = width => {
    // eslint-disable-next-line no-self-compare
    if (!(typeof width === "number" && width === width && width > 0)) {
      throw new Error("unassessed: invalid output width");
    }

    expect.output.preferredWidth = width;
  };

  unassessed.withPlugins = (...plugins) => {
    const expectWithPlugins = unexpected.clone();

    plugins.forEach(plugin => {
      expectWithPlugins.use(plugin);
    });

    return _createAssessed(expectWithPlugins);
  };

  unassessed.withUnexpectedPlugins = (...plugins) => {
    const expectWithPlugins = unexpected.clone();

    plugins.forEach(plugin => {
      expectWithPlugins.use(plugin);
    });

    return _createAssessed(expectWithPlugins);
  };

  ensureAfterEachIsRegistered();

  return unassessed;
}

function createAssessed(expect) {
  return _createAssessed(expect.clone(), require("./casedFunctions"));
}

module.exports = createAssessed(unexpected);
