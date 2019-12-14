export = unassessed;

declare const unassessed: unassessed.Assess;

declare namespace unassessed {
  interface Assess {
    /**
     * The `access` function is called to wrap a subject to assert against.
     *
     * @param subject What we will assert against.
     */
    <T = any>(subject: T): Matchers;

    it: Matchers;

    setOutputWidth(width: number): void;
    withUnexpectedPlugins(...plugins: object[]): Assess;
  }

  interface Constructable {
    new (...args: any[]): any;
  }

  type Result = Promise<any> | undefined;

  interface Matchers {
    /* __matchers__ */
  }
}
