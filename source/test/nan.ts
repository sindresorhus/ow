import test from 'ava';
import m from '..';

test('nan', t => {
	t.notThrows(() => m(NaN, m.nan));
	t.notThrows(() => m(Number.NaN, m.nan));
	t.notThrows(() => m(0 / 0, m.nan));
	t.notThrows(() => m(0 / 0, m.nan.label('foo')));
	t.throws(() => m(12, m.nan), 'Expected argument to be of type `nan` but received type `number`');
	t.throws(() => m(12, m.nan.label('foo')), 'Expected `foo` to be of type `nan` but received type `number`');
	t.throws(() => m('12' as any, m.nan), 'Expected argument to be of type `nan` but received type `string`');
});
