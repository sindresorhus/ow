import test from 'ava';
import m from '..';

test('regExp', t => {
	t.notThrows(() => m(/\d/, m.regExp));
	t.notThrows(() => m(new RegExp('\d'), m.regExp));
	t.throws(() => m('foo' as any, m.regExp), 'Expected argument to be of type `regExp` but received type `string`');
	t.throws(() => m(12 as any, m.regExp), 'Expected argument to be of type `regExp` but received type `number`');
});
