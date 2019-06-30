import {Main} from '..';

type Narrow<T> = T extends undefined ? never : T;

/**
@hidden
*/
export const testSymbol = Symbol('test');

/**
@hidden
*/
export const isPredicate = (value: any): value is BasePredicate => Boolean(value && value[testSymbol]);

/**
@hidden
*/
export interface BasePredicate<T = unknown> {
	[testSymbol](value: Narrow<T>, main: Main, label: string | Function): void;
}
