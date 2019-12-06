function prepareAssertions(expect) {
  const assertions = Object.assign({}, expect.assertions);

  Object.keys(assertions).forEach(key => {
    const value = assertions[key];
    let assertionAlternation;
    if (
      value.length > 1 &&
      (assertionAlternation = value.find(v =>
        v.declaration.endsWith("<assertion>")
      )) &&
      key.indexOf("assertion") === -1
    ) {
      assertions[`${key} assertion`] = [assertionAlternation];
    }
  });

  return assertions;
}

module.exports = prepareAssertions;
