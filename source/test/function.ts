import test from 'ava';
import m from '..';

test('function', t => {
	t.notThrows(() => m(() => {}, m.function));		// tslint:disable-line:no-empty
	t.notThrows(() => m(() => {}, m.function.label('foo')));		// tslint:disable-line:no-empty
	t.throws(() => m('foo' as any, m.function), 'Expected argument to be of type `Function` but received type `string`');
	t.throws(() => m('foo' as any, m.function.label('foo')), 'Expected `foo` to be of type `Function` but received type `string`');
	t.throws(() => m(12 as any, m.function), 'Expected argument to be of type `Function` but received type `number`');
});
