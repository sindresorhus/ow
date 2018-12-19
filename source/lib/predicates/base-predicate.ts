import {Ow} from '../..';

/**
 * @hidden
 */
export const testSymbol = Symbol('test');

/**
 * @hidden
 */
export interface BasePredicate<T = any> {
	// tslint:disable-next-line completed-docs
	[testSymbol](value: T, main: Ow): void;
}
