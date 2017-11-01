import test from 'ava';
import * as m from '..';

test('not', t => {
	t.notThrows(() => m(1, m.number.not.infinite));
	t.notThrows(() => m(1, m.number.not.infinite.greaterThan(5)));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.throws(() => m('', m.string.not.empty), '[NOT] Expected string to be empty, got ``');
});
