# Unassessed

This module is an extensible type-aware assertion library.

[![NPM version](https://img.shields.io/npm/v/unassessed.svg)](https://www.npmjs.com/package/unassessed)
[![Build Status](https://img.shields.io/travis/alexjeffburke/unassessed/master.svg)](https://travis-ci.org/alexjeffburke/unassessed)

## Use

Unassessed can be installed simply from npm:

```
$ npm install --save-dev unassessed
```

From that point it can be imported directly into a JavaScript
project and used to make assertions about values:

```js
const assess = requre("unassessed");

const someValue = "foo";

assess(someValue).notToBeEmpty();
```

## Assertions and specs

The two most common used assertions are `.toEqual()` and `.toSatisfy()`.
In their simplest forms, these allow assessing an arbitrary input against
a specification which describes properties that the input value must conform
to for the assertion to be considered passing.

> we call the input value a **"subject"** and the specification a **"spec"**

### `.toEqual()`

This assertion enforces the subject and its spec to be exactly equal. In the
simple case, we imagine that the subject and value strings should be the same:

```js
assess("foo").toEqual("foo");
```

But this also extends to an object where we ensure that the subject has exactly
every property mentioned in the spec - they must all be present, no more and no
fewer, and all their types must be identical:

```js
const someObject = {
  foo: 1,
  bar: "quux"
};

assess(someObject).toEqual({
  foo: 1,
  bar: "quux"
});
```

### `.toSatisfy()`

This assertion is very similar to the equality assertion, but it permits a
spec which mentions a subset of the subjcet that must be identical for the
assertion to pass:

```js
const otherObject = {
  foo: 1,
  bar: "quux",
  relatedThings: ["buses", "planes", "trains"]
};

assess(otherObject).toSatisfy({
  relatedThings: ["buses", "planes", "trains"]
});
```

Notice here that we did not have to say anything about the "foo" or "bar"
properties in our spec because we are only interested in "relatedThings".

#### Complex properties

Sometimes we want a spec to describe a characterisrtic rather an absolute value.

Imagine that, rather than "relatedThings" having a specific value, we just want to make
sure that it isn't empty. You can use the `assess.it.*` functions in this situation:

```js
assess(otherObject).toSatisfy({
  relatedThings: assess.it.notToBeEmpty()
});
```

#### Exhaustively satisfying

Now that we have seen both equality and the satisfying against descriptions of values
we might want to us the expressive power provided by `assess.it.` but still make sure
that all the properties are present.

In some ways this is coming full circle - and we provide a special "exhaustively"
variant for just this purpose:

```js
assess(otherObject).toExhaustivelySatisfy({
  foo: assess.it.toBeANumber(),
  bar: assess.it.toBeAString(),
  relatedThings: assess.it.toHaveLength(3)
});
```

## Types and typing

Each assertion defined by the library is type aware and, when supplied a
subject and some spec, will check not just that their types are compatible
but also that the assertion actually makes sense. In JavaScript, only some
types like strings and arrays have a concept of

### TypeScript

In addition to extensive runtime validation we also ship wth a TypeScript
definition for all assertions that are provided with the core library.

## Extensibility and plugins

The ability to provide extra assertions which expend the statements
that we are able to make - either to integrate with other testing tools
or simply to provide more precise ways to reason about data within our
programs is extremely important and valuable.

Unassessed has been made compatible with modules authored as
[plugins for the Unexpected](http://unexpected.js.org/plugins/)
library. When these are supplied to the `withUnexpectedPlugins()`
a new assess function will be returned with any assertions made
available by the plugin registered:

```js
const assess = require("unassessed");
const unexpectedSinonPlugin = require("unexpected-sinon");

const assessWithSinon = assess.withUnexpectedPlugins(unexpectedSinonPlugin);

const stub = sinon.stub();

assessWithSinon(stub).wasNotCalled();
```
