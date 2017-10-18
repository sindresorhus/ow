import test from 'ava';
import * as m from '..';

test('not', t => {
	t.notThrows(() => m(1, m.number.not.negative));
	t.notThrows(() => m(1, m.number.not.infinite));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
});
