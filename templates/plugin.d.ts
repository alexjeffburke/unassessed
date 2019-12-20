import * as assess from "unassessed";

export = plugin;

declare const plugin: assess.Plugin;

declare module "unassessed" {
  interface Assertions {
    /* __assertions__ */
  }
}
