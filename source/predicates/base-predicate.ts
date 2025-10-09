import type {Main} from '../index.js';

/**
@hidden
*/
export const testSymbol: unique symbol = Symbol('test');

/**
@hidden
*/
export const optionalSymbol: unique symbol = Symbol('optional');

/**
@hidden
*/
export const nullableSymbol: unique symbol = Symbol('nullable');

/**
@hidden
*/
export const absentSymbol: unique symbol = Symbol('absent');

/**
@hidden
*/
export const isPredicate = (value: unknown): value is BasePredicate => Boolean((value as any)?.[testSymbol]);

/**
@hidden
*/
export type BasePredicate<T = unknown> = {
	[optionalSymbol]?: boolean;
	[nullableSymbol]?: boolean;
	[absentSymbol]?: boolean;
	[testSymbol](value: T, main: Main, label: string | Function, idLabel?: boolean): void;
};
