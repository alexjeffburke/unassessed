/* global expect:false */
const path = require("path");

const spawnInDir = require("../utils/spawnInDir");

const UNASSESSED_TYPES_BIN = path.join(
  __dirname,
  "..",
  "..",
  "bin",
  "unassessed-types"
);

describe("bin/unassessed-types", () => {
  describe("with a simple plugin", () => {
    const pluginModuleRequire = "../../testdata/bin/simple-plugin";

    it("should generate a plugin type declaration", () => {
      return expect(
        spawnInDir(__dirname, UNASSESSED_TYPES_BIN, [
          "unexpected-plugin",
          pluginModuleRequire
        ]),
        "to be fulfilled"
      ).then(({ stdout }) =>
        expect(
          stdout,
          "to equal snapshot",
          expect.unindent`
          import * as assess from "unassessed";

          export = plugin;

          declare const plugin: assess.Plugin;

          declare module "unassessed" {
            interface Assertions {
              toBeSuffixedWith(value: string): Result
            }
          }


          `
        )
      );
    });

    it("should be correctly defined as a usable plugin", () => {
      const expectWithPlugin = expect.clone().use(require(pluginModuleRequire));

      expect(() => {
        expectWithPlugin("foo-bar", "to be suffixed with", "-bar");
      }, "not to throw");
    });
  });
});
