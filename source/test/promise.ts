import test from 'ava';
import m from '..';

test('promise', t => {
	t.notThrows(() => m(Promise.resolve(), m.promise));
	t.notThrows(() => m(new Promise(resolve => resolve()), m.promise));
	t.throws(() => m('foo' as any, m.promise), 'Expected argument to be of type `Promise` but received type `string`');
	t.throws(() => m('foo' as any, 'foo', m.promise), 'Expected `foo` to be of type `Promise` but received type `string`');
	t.throws(() => m(12 as any, m.promise), 'Expected argument to be of type `Promise` but received type `number`');
});
