module.exports = {
  name: "simple-plugin",
  installInto: expect => {
    expect.addAssertion(
      "<string> to be suffixed with <string>",
      (expect, subject, value) => {
        expect(subject.endsWith(value), "to be true");
      }
    );
  }
};
