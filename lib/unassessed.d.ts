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
    notToBeTruthy(): Result
    toBeTruthy(): Result
    notToBe(value: string|any): Result
    toBe(value: string|any): Result
    notToBeTrue(): Result
    toBeTrue(): Result
    notToBeFalse(): Result
    toBeFalse(): Result
    notToBeFalsy(): Result
    toBeFalsy(): Result
    notToBeNull(): Result
    toBeNull(): Result
    notToBeUndefined(): Result
    toBeUndefined(): Result
    notToBeDefined(): Result
    toBeDefined(): Result
    notToBeNaN(): Result
    toBeNaN(): Result
    notToBeCloseTo(value: number, value2?: number): Result
    toBeCloseTo(value: number, value2?: number): Result
    notToBeA(value: Constructable|string): Result
    notToBeAn(value: Constructable|string): Result
    toBeA(value: Constructable|string): Result
    toBeAn(value: Constructable|string): Result
    notToBeOneOf(value: any[]): Result
    toBeOneOf(value: any[]): Result
    notToBeAnObject(): Result
    notToBeAnArray(): Result
    toBeAnObject(): Result
    toBeAnArray(): Result
    notToBeABoolean(): Result
    notToBeANumber(): Result
    notToBeAString(): Result
    notToBeAFunction(): Result
    notToBeARegexp(): Result
    notToBeARegex(): Result
    notToBeARegularExpression(): Result
    notToBeADate(): Result
    toBeABoolean(): Result
    toBeANumber(): Result
    toBeAString(): Result
    toBeAFunction(): Result
    toBeARegexp(): Result
    toBeARegex(): Result
    toBeARegularExpression(): Result
    toBeADate(): Result
    toBeTheEmptyString(): Result
    toBeAnEmptyString(): Result
    toBeTheEmptyArray(): Result
    toBeAnEmptyArray(): Result
    toMatch(value: RegExp): Result
    notToMatch(value: RegExp): Result
    notToHaveOwnProperty(value: string): Result
    toHaveOwnProperty(value: string, value2: any): Result
    notToHaveEnumerableProperty(value: string): Result
    notToHaveConfigurableProperty(value: string): Result
    notToHaveWritableProperty(value: string): Result
    toHaveEnumerableProperty(value: string): Result
    toHaveConfigurableProperty(value: string): Result
    toHaveWritableProperty(value: string): Result
    notToHaveProperty(value: string): Result
    toHaveProperty(value: string, value2: any): Result
    notToHaveOwnProperties(value: any[]): Result
    notToHaveProperties(value: any[]): Result
    toOnlyHaveOwnProperties(value: any[]): Result
    toOnlyHaveProperties(value: any[]): Result
    toHaveOwnProperties(value: any[]|object): Result
    toHaveProperties(value: any[]|object): Result
    notToHaveLength(value: number): Result
    toHaveLength(value: number): Result
    notToBeEmpty(): Result
    toBeEmpty(): Result
    notToContain(): Result
    toContain(): Result
    notToBeginWith(value: string): Result
    toBeginWith(value: string): Result
    notToStartWith(value: string): Result
    toStartWith(value: string): Result
    notToEndWith(value: string): Result
    toEndWith(value: string): Result
    notToBeFinite(): Result
    toBeFinite(): Result
    notToBeInfinite(): Result
    toBeInfinite(): Result
    notToBeWithin(value: string|bigint|number, value2: string|bigint|number): Result
    toBeWithin(value: string|bigint|number, value2: string|bigint|number): Result
    notToBeLessThan(value: string|bigint|number): Result
    notToBeBelow(value: string|bigint|number): Result
    toBeLessThan(value: string|bigint|number): Result
    toBeBelow(value: string|bigint|number): Result
    notToBeLessThanOrEqualTo(value: string|bigint|number): Result
    toBeLessThanOrEqualTo(value: string|bigint|number): Result
    notToBeGreaterThan(value: string|bigint|number): Result
    notToBeAbove(value: string|bigint|number): Result
    toBeGreaterThan(value: string|bigint|number): Result
    toBeAbove(value: string|bigint|number): Result
    notToBeGreaterThanOrEqualTo(value: string|bigint|number): Result
    toBeGreaterThanOrEqualTo(value: string|bigint|number): Result
    notToBePositive(): Result
    toBePositive(): Result
    notToBeNegative(): Result
    toBeNegative(): Result
    toEqual(value: any): Result
    notToEqual(value: any): Result
    toError(value: any): Result
    toErrorWith(value: any): Result
    notToError(): Result
    notToThrow(): Result
    toThrow(value: any): Result
    toThrowError(value: any): Result
    toThrowException(value: any): Result
    toSatisfy(value: Uint8Array|RegExp|string|any[]|Constructable|any|Error|object): Result
    toThrowA(value: Constructable): Result
    toThrowAn(value: Constructable): Result
    toHaveArity(value: number): Result
    toHaveValuesExhaustivelySatisfying(value: any): Result
    toHaveValuesSatisfying(value: any): Result
    toBeAMapWhoseValuesExhaustivelySatisfy(value: any): Result
    toBeAMapWhoseValuesSatisfy(value: any): Result
    toBeAHashWhoseValuesExhaustivelySatisfy(value: any): Result
    toBeAHashWhoseValuesSatisfy(value: any): Result
    toBeAnObjectWhoseValuesExhaustivelySatisfy(value: any): Result
    toBeAnObjectWhoseValuesSatisfy(value: any): Result
    toHaveItemsExhaustivelySatisfying(value: any): Result
    toHaveItemsSatisfying(value: any): Result
    toBeAnArrayWhoseItemsExhaustivelySatisfy(value: any): Result
    toBeAnArrayWhoseItemsSatisfy(value: any): Result
    toHaveKeysSatisfying(value: any): Result
    toBeAMapWhoseKeysSatisfy(value: any): Result
    toBeAMapWhosePropertiesSatisfy(value: any): Result
    toBeAHashWhoseKeysSatisfy(value: any): Result
    toBeAHashWhosePropertiesSatisfy(value: any): Result
    toBeAnObjectWhoseKeysSatisfy(value: any): Result
    toBeAnObjectWhosePropertiesSatisfy(value: any): Result
    notToHaveAValueExhaustivelySatisfying(value: any): Result
    notToHaveAValueSatisfying(value: any): Result
    toHaveAValueExhaustivelySatisfying(value: any): Result
    toHaveAValueSatisfying(value: any): Result
    notToHaveAnItemExhaustivelySatisfying(value: any): Result
    notToHaveAnItemSatisfying(value: any): Result
    toHaveAnItemExhaustivelySatisfying(value: any): Result
    toHaveAnItemSatisfying(value: any): Result
    toBeCanonical(): Result
    toHaveMessage(value: any): Result
    toExhaustivelySatisfy(value: Uint8Array|RegExp|string|any[]|Constructable|any|Error|object): Result
    notToExhaustivelySatisfy(value: any): Result
    notToSatisfy(value: any): Result
    toBeRejected(): Result
    toBeRejectedWith(value: any): Result
    toBeRejectedWithErrorExhaustivelySatisfying(value: any): Result
    toBeRejectedWithErrorSatisfying(value: any): Result
    toBeFulfilled(): Result
    toBeFulfilledWith(value: any): Result
    toBeFulfilledWithValueExhaustivelySatisfying(value: any): Result
    toBeFulfilledWithValueSatisfying(value: any): Result
    toCallTheCallback(): Result
    toCallTheCallbackWithoutError(): Result
    toCallTheCallbackWithError(value: any): Result
  }
}
