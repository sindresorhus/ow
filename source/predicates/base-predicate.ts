import {Main} from '..';

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
	// tslint:disable-next-line completed-docs
	[testSymbol](value: T, main: Main, label: string | Function): void;
}
