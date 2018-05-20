import test from 'ava';
import m from '..';

class CustomError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CustomError';
	}
}

test('error', t => {
	t.notThrows(() => m(new Error('foo'), m.error));
	t.notThrows(() => m(new Error('foo'), m.error.label('err')));
	t.throws(() => m('12' as any, m.error), 'Expected argument to be of type `error` but received type `string`');
	t.throws(() => m('12' as any, m.error.label('err')), 'Expected `err` to be of type `error` but received type `string`');
});

test('error.name', t => {
	t.notThrows(() => m(new Error('foo'), m.error.name('Error')));
	t.notThrows(() => m(new CustomError('foo'), m.error.name('CustomError')));
	t.notThrows(() => m(new CustomError('foo'), m.error.label('err').name('CustomError')));
	t.notThrows(() => m(new CustomError('foo'), m.error.name('CustomError').label('err')));
	t.throws(() => m(new CustomError('foo'), m.error.name('Error')), 'Expected error to have name `Error`, got `CustomError`');
	t.throws(() => m(new CustomError('foo'), m.error.label('err').name('Error')), 'Expected error `err` to have name `Error`, got `CustomError`');
	t.throws(() => m(new CustomError('foo'), m.error.name('Error').label('err')), 'Expected error `err` to have name `Error`, got `CustomError`');
});

test('error.message', t => {
	t.notThrows(() => m(new Error('foo'), m.error.message('foo')));
	t.notThrows(() => m(new CustomError('bar'), m.error.message('bar')));
	t.throws(() => m(new CustomError('foo'), m.error.message('bar')), 'Expected error message to be `bar`, got `foo`');
});

test('error.messageIncludes', t => {
	t.notThrows(() => m(new Error('foo bar'), m.error.messageIncludes('foo')));
	t.notThrows(() => m(new Error('foo bar'), m.error.messageIncludes('o')));
	t.notThrows(() => m(new CustomError('foo bar'), m.error.messageIncludes('bar')));
	t.throws(() => m(new CustomError('foo bar'), m.error.messageIncludes('unicorn')), 'Expected error message to include `unicorn`, got `foo bar`');
});

test('error.hasKeys', t => {
	const err: any = new Error('foo');
	err.unicorn = '🦄';
	err.rainbow = '🌈';

	t.notThrows(() => m(err, m.error.hasKeys('unicorn')));
	t.notThrows(() => m(err, m.error.hasKeys('unicorn', 'rainbow')));
	t.throws(() => m(err, m.error.hasKeys('foo')), 'Expected error message to have keys `foo`');
	t.throws(() => m(err, m.error.hasKeys('unicorn', 'foo')), 'Expected error message to have keys `unicorn`, `foo`');
});

test('error.instanceOf', t => {
	t.notThrows(() => m(new CustomError('foo'), m.error.instanceOf(CustomError)));
	t.notThrows(() => m(new CustomError('foo'), m.error.instanceOf(Error)));
	t.notThrows(() => m(new TypeError('foo'), m.error.instanceOf(Error)));
	t.notThrows(() => m(new Error('foo'), m.error.instanceOf(Error)));
	t.notThrows(() => m(new Error('foo'), m.error.label('err').instanceOf(Error)));
	t.throws(() => m(new Error('foo'), m.error.instanceOf(CustomError)), 'Expected error `Error` to be of type `CustomError`');
	t.throws(() => m(new Error('foo'), m.error.label('err').instanceOf(CustomError)), 'Expected error `err` `Error` to be of type `CustomError`');
	t.throws(() => m(new TypeError('foo'), m.error.instanceOf(EvalError)), 'Expected error `TypeError` to be of type `EvalError`');
	t.throws(() => m(new TypeError('foo'), m.error.label('err').instanceOf(EvalError)), 'Expected error `err` `TypeError` to be of type `EvalError`');
});

test('error.typeError', t => {
	t.notThrows(() => m(new TypeError('foo'), m.error.typeError));
	t.throws(() => m(new Error('foo'), m.error.typeError), 'Expected error `Error` to be of type `TypeError`');
	t.throws(() => m(new Error('foo'), m.error.label('foo').typeError), 'Expected error `foo` `Error` to be of type `TypeError`');
});

test('error.evalError', t => {
	t.notThrows(() => m(new EvalError('foo'), m.error.evalError));
	t.throws(() => m(new Error('foo'), m.error.evalError), 'Expected error `Error` to be of type `EvalError`');
});

test('error.rangeError', t => {
	t.notThrows(() => m(new RangeError('foo'), m.error.rangeError));
	t.throws(() => m(new EvalError('foo'), m.error.rangeError), 'Expected error `EvalError` to be of type `RangeError`');
});

test('error.referenceError', t => {
	t.notThrows(() => m(new ReferenceError('foo'), m.error.referenceError));
	t.throws(() => m(new Error('foo'), m.error.referenceError), 'Expected error `Error` to be of type `ReferenceError`');
});

test('error.syntaxError', t => {
	t.notThrows(() => m(new SyntaxError('foo'), m.error.syntaxError));
	t.throws(() => m(new Error('foo'), m.error.syntaxError), 'Expected error `Error` to be of type `SyntaxError`');
});

test('error.uriError', t => {
	t.notThrows(() => m(new URIError('foo'), m.error.uriError));
	t.throws(() => m(new Error('foo'), m.error.uriError), 'Expected error `Error` to be of type `URIError`');
});
