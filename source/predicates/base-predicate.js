/**
@hidden
*/
export const testSymbol = Symbol('test');
/**
@hidden
*/
export const isPredicate = value => Boolean(value[testSymbol]);
