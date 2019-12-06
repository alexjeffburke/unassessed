export = unexempted;

declare const unexempted: unexempted.Expect;

declare namespace unexempted {
  interface Expect {
    /**
     * The `expect` function is used every time you want to test a value.
     * You will rarely call `expect` by itself.
     *
     * @param subject What we will assert against.
     */
    <T = any>(subject: T): Matchers;

    it: Matchers;
  }

  interface Constructable {
    new (...args: any[]): any;
  }

  type Result = Promise<any> | undefined;

  interface Matchers {
    /* __matchers__ */
  }
}
