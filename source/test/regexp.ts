import test from 'ava';
import ow from '..';

test('regExp', t => {
	t.notThrows(() => {
		ow(/\d/, ow.regExp);
	});

	t.notThrows(() => {
		ow(new RegExp('\d'), ow.regExp);
	});

	t.throws(() => {
		ow('foo' as any, ow.regExp);
	}, 'Expected argument to be of type `RegExp` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.regExp);
	}, 'Expected `foo` to be of type `RegExp` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.regExp);
	}, 'Expected argument to be of type `RegExp` but received type `number`');
});
