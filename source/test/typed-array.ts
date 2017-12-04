import test from 'ava';
import m from '..';

test('typedArray', t => {
	t.notThrows(() => m(new Int8Array(2), m.typedArray));
	t.notThrows(() => m(new Uint8Array(2), m.typedArray));
	t.notThrows(() => m(new Int32Array(2), m.typedArray));
	t.notThrows(() => m(new Float64Array(2), m.typedArray));
	t.throws(() => m('foo', m.typedArray), 'Expected argument to be of type `typedArray` but received type `string`');
	t.throws(() => m(12, m.typedArray), 'Expected argument to be of type `typedArray` but received type `number`');
});

test('int8Array', t => {
	t.notThrows(() => m(new Int8Array(2), m.int8Array));
	t.throws(() => m('foo', m.int8Array), 'Expected argument to be of type `int8Array` but received type `string`');
	t.throws(() => m(12, m.int8Array), 'Expected argument to be of type `int8Array` but received type `number`');
});

test('uint8Array', t => {
	t.notThrows(() => m(new Uint8Array(2), m.uint8Array));
	t.throws(() => m('foo', m.uint8Array), 'Expected argument to be of type `uint8Array` but received type `string`');
	t.throws(() => m(12, m.uint8Array), 'Expected argument to be of type `uint8Array` but received type `number`');
});

test('uint8ClampedArray', t => {
	t.notThrows(() => m(new Uint8ClampedArray(2), m.uint8ClampedArray));
	t.throws(() => m('foo', m.uint8ClampedArray), 'Expected argument to be of type `uint8ClampedArray` but received type `string`');
	t.throws(() => m(12, m.uint8ClampedArray), 'Expected argument to be of type `uint8ClampedArray` but received type `number`');
});

test('int16Array', t => {
	t.notThrows(() => m(new Int16Array(2), m.int16Array));
	t.throws(() => m('foo', m.int16Array), 'Expected argument to be of type `int16Array` but received type `string`');
	t.throws(() => m(12, m.int16Array), 'Expected argument to be of type `int16Array` but received type `number`');
});

test('uint16Array', t => {
	t.notThrows(() => m(new Uint16Array(2), m.uint16Array));
	t.throws(() => m('foo', m.uint16Array), 'Expected argument to be of type `uint16Array` but received type `string`');
	t.throws(() => m(12, m.uint16Array), 'Expected argument to be of type `uint16Array` but received type `number`');
});

test('int32Array', t => {
	t.notThrows(() => m(new Int32Array(2), m.int32Array));
	t.throws(() => m('foo', m.int32Array), 'Expected argument to be of type `int32Array` but received type `string`');
	t.throws(() => m(12, m.int32Array), 'Expected argument to be of type `int32Array` but received type `number`');
});

test('uint32Array', t => {
	t.notThrows(() => m(new Uint32Array(2), m.uint32Array));
	t.throws(() => m('foo', m.uint32Array), 'Expected argument to be of type `uint32Array` but received type `string`');
	t.throws(() => m(12, m.uint32Array), 'Expected argument to be of type `uint32Array` but received type `number`');
});

test('float32Array', t => {
	t.notThrows(() => m(new Float32Array(2), m.float32Array));
	t.throws(() => m('foo', m.float32Array), 'Expected argument to be of type `float32Array` but received type `string`');
	t.throws(() => m(12, m.float32Array), 'Expected argument to be of type `float32Array` but received type `number`');
});

test('float64Array', t => {
	t.notThrows(() => m(new Float64Array(2), m.float64Array));
	t.throws(() => m('foo', m.float64Array), 'Expected argument to be of type `float64Array` but received type `string`');
	t.throws(() => m(12, m.float64Array), 'Expected argument to be of type `float64Array` but received type `number`');
});
