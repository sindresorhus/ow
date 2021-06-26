import {Main} from '..';

/**
@hidden
*/
export const testSymbol: unique symbol = Symbol('test');

/**
@hidden
*/
export const isPredicate = (value: unknown): value is BasePredicate => Boolean((value as any)[testSymbol]);

/**
@hidden
*/
export interface BasePredicate<T = unknown> {
	[testSymbol](value: T, main: Main, label: string | Function, idLabel?: boolean): void;
}
