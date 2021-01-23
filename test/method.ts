import test from 'ava';
import ow from '../source';

test('method', t => {
	const add = ow.method([ow.number, ow.number], (a, b) => a + b);

	t.is(add(2, 2), 4);

	t.throws(() => {
		add('2' as any, 2);
	}, 'Expected element `0` to be of type `number` but received type `string` in array `parameters`');

	t.throws(() => {
		add(2, '2' as any);
	}, 'Expected element `1` to be of type `number` but received type `string` in array `parameters`');
});

test('method with label', t => {
	const add = ow.method([ow.number, ow.number], 'plus', (a, b) => a + b);

	t.is(add(2, 2), 4);

	t.throws(() => {
		add('2' as any, 2);
	}, 'Expected element `0` to be of type `number` but received type `string` in array `plus:parameters`');

	t.throws(() => {
		add(2, '2' as any);
	}, 'Expected element `1` to be of type `number` but received type `string` in array `plus:parameters`');
});
