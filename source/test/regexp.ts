import test from 'ava';
import m from '..';

test('regExp', t => {
	t.notThrows(() => m(/\d/, m.regExp));
	t.notThrows(() => m(new RegExp('\d'), m.regExp));
	t.notThrows(() => m(new RegExp('\d'), m.regExp.label('foo')));
	t.throws(() => m('foo' as any, m.regExp), 'Expected argument to be of type `RegExp` but received type `string`');
	t.throws(() => m('foo' as any, m.regExp.label('foo')), 'Expected `foo` to be of type `RegExp` but received type `string`');
	t.throws(() => m(12 as any, m.regExp), 'Expected argument to be of type `RegExp` but received type `number`');
});
