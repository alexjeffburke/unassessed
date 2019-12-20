function prepareAssertions(expect) {
  const assertions = {};
  const assertionsWithNestingSuffix = {};

  Object.keys(expect.assertions).forEach(key => {
    const value = expect.assertions[key];

    if (key.endsWith(" assertion")) {
      assertionsWithNestingSuffix[key] = value;
    } else {
      assertions[key] = value;
    }
  });

  Object.keys(assertionsWithNestingSuffix).forEach(key => {
    const value = assertionsWithNestingSuffix[key];
    let assertionAlternation;
    if (
      value.length > 1 &&
      (assertionAlternation = value.find(v =>
        v.declaration.endsWith("<assertion>")
      ))
    ) {
      const keywithoutSuffix = key.slice(0, -" assertion".length);
      if (assertions[keywithoutSuffix]) {
        assertions[keywithoutSuffix].push(assertionAlternation);
      } else {
        assertions[key] = value;
      }
    }
  });

  return assertions;
}

module.exports = prepareAssertions;
