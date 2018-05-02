import test from 'ava';
import m from '..';

test('undefined', t => {
	const x = undefined;
	const y = 12;

	t.notThrows(() => m(undefined, m.undefined));
	t.notThrows(() => m(x, m.undefined));
	t.throws(() => m(y, m.undefined), 'Expected argument to be of type `undefined` but received type `number`');
	t.throws(() => m(null, m.undefined), 'Expected argument to be of type `undefined` but received type `null`');
	t.throws(() => m('foo', m.undefined), 'Expected argument to be of type `undefined` but received type `string`');
});
