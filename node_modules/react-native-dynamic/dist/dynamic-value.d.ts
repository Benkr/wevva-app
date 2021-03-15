interface IDynamicValue<T> {
    light: T;
    dark: T;
}
export declare class DynamicValue<T> implements IDynamicValue<T> {
    readonly light: T;
    readonly dark: T;
    constructor(light: T, dark: T);
}
export declare function useDynamicValue<T>(dynamic: IDynamicValue<T>): T;
export declare function useDynamicValue<T>(light: T, dark: T): T;
export {};
