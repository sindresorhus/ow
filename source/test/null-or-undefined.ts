import test from 'ava';
import m from '..';

test('nullOrUndefined', t => {
	const x = null;
	const y = undefined;

	t.notThrows(() => m(null, m.nullOrUndefined));
	t.notThrows(() => m(undefined, m.nullOrUndefined));
	t.notThrows(() => m(x, m.nullOrUndefined));
	t.notThrows(() => m(y, m.nullOrUndefined));
	t.notThrows(() => m(y, m.nullOrUndefined.label('foo')));
	t.throws(() => m('foo', m.nullOrUndefined), 'Expected argument to be of type `nullOrUndefined` but received type `string`');
	t.throws(() => m('foo', m.nullOrUndefined.label('foo')), 'Expected `foo` to be of type `nullOrUndefined` but received type `string`');
});
