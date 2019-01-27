import test from 'ava';
import ow from '..';

test('nullOrUndefined', t => {
	// tslint:disable-next-line no-null-keyword
	const x = null;
	const y = undefined;

	t.notThrows(() => {
		// tslint:disable-next-line no-null-keyword
		ow(null, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(undefined, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(x, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(y, ow.nullOrUndefined);
	});

	t.throws(() => {
		ow('foo' as any, ow.nullOrUndefined);
	}, 'Expected argument to be of type `nullOrUndefined` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.nullOrUndefined);
	}, 'Expected `foo` to be of type `nullOrUndefined` but received type `string`');
});
