export = unassessed;

declare const unassessed: unassessed.Assess;

declare namespace unassessed {
  interface Assess {
    /**
     * The `access` function is called to wrap a subject to assert against.
     *
     * @param subject What we will assert against.
     */
    <T = any>(subject: T): Assertions;

    it: Assertions;

    setOutputWidth(width: number): void;
    withPlugins(...plugins: Plugin[]): Assess;
    withUnexpectedPlugins(...plugins: UnexpectedPlugin[]): Assess;
  }

  interface Plugin {
    _unassessedPlugin: true;
  }

  interface UnexpectedPlugin {
    name: string;
    installInto(expect: object): void;
  }

  interface Constructable {
    new (...args: any[]): any;
  }

  type Result = Promise<any> | undefined;

  interface Assertions {
    /* __assertions__ */
  }
}
