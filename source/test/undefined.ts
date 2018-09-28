import test from 'ava';
import m from '..';

test('undefined', t => {
	const x = undefined;
	const y = 12;

	t.notThrows(() => m(undefined, m.undefined));
	t.notThrows(() => m(x, m.undefined));
	t.notThrows(() => m(x, m.undefined.label('foo')));
	t.throws(() => m(y as any, m.undefined), 'Expected argument to be of type `undefined` but received type `number`');
	t.throws(() => m(y as any, m.undefined.label('foo')), 'Expected `foo` to be of type `undefined` but received type `number`');
	t.throws(() => m(null as any, m.undefined), 'Expected argument to be of type `undefined` but received type `null`');
	t.throws(() => m('foo' as any, m.undefined), 'Expected argument to be of type `undefined` but received type `string`');
});
