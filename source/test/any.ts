import test from 'ava';
import m from '..';

const createError = (...errors: string[]) => {
	return [
		'Any predicate failed with the following errors:',
		...errors.map(error => `- ${error}`)
	].join('\n');
}

test('any', t => {
	t.notThrows(() => m(1, m.any(m.number)));
	t.notThrows(() => m(1, m.any(m.number, m.string)));
	t.notThrows(() => m(1, m.any(m.number, m.string)));
	t.notThrows(() => m(true, m.any(m.number, m.string, m.boolean)));
	t.throws(() => m(1 as any, m.any(m.string)), createError('Expected argument to be of type `string` but received type `number`'));
	t.throws(() => m(true as any, m.any(m.number, m.string)), createError(
		'Expected argument to be of type `number` but received type `boolean`',
		'Expected argument to be of type `string` but received type `boolean`'
	));
});
