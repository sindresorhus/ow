import {Ow} from '../..';

/**
 * @hidden
 */
export const testSymbol = Symbol('test');

/**
 * @hidden
 */
export interface BasePredicate<T = any> {
	[testSymbol](value: T, main: Ow, label?: string): void;
}
