import test from 'ava';
import ow from '../source/index.js';

test('regExp', t => {
	t.notThrows(() => {
		ow(/\d/, ow.regExp);
	});

	t.notThrows(() => {
		// eslint-disable-next-line prefer-regex-literals
		ow(new RegExp('\\d'), ow.regExp);
	});

	t.throws(() => {
		ow('foo' as any, ow.regExp);
	}, {message: 'Expected argument to be of type `RegExp` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.regExp);
	}, {message: 'Expected `foo` to be of type `RegExp` but received type `string`'});

	t.throws(() => {
		ow(12 as any, ow.regExp);
	}, {message: 'Expected argument to be of type `RegExp` but received type `number`'});
});
