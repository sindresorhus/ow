import test from 'ava';
import ow from '..';

test('promise', t => {
	t.notThrows(() => ow(Promise.resolve(), ow.promise));
	t.notThrows(() => ow(new Promise(resolve => resolve()), ow.promise));
	t.throws(() => ow('foo' as any, ow.promise), 'Expected argument to be of type `Promise` but received type `string`');
	t.throws(() => ow('foo' as any, 'foo', ow.promise), 'Expected `foo` to be of type `Promise` but received type `string`');
	t.throws(() => ow(12 as any, ow.promise), 'Expected argument to be of type `Promise` but received type `number`');
});
