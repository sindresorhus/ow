import test from 'ava';
import ow from '../source';

test('typedArray', t => {
	t.notThrows(() => {
		ow(new Int8Array(2), ow.typedArray);
	});

	t.notThrows(() => {
		ow(new Uint8Array(2), ow.typedArray);
	});

	t.notThrows(() => {
		ow(new Int32Array(2), ow.typedArray);
	});

	t.notThrows(() => {
		ow(new Float64Array(2), ow.typedArray);
	});

	t.throws(() => {
		ow('foo' as any, ow.typedArray);
	}, 'Expected argument to be of type `TypedArray` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.typedArray);
	}, 'Expected `foo` to be of type `TypedArray` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.typedArray);
	}, 'Expected argument to be of type `TypedArray` but received type `number`');
});

test('int8Array', t => {
	t.notThrows(() => {
		ow(new Int8Array(2), ow.int8Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int8Array);
	}, 'Expected argument to be of type `Int8Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.int8Array);
	}, 'Expected argument to be of type `Int8Array` but received type `number`');
});

test('uint8Array', t => {
	t.notThrows(() => {
		ow(new Uint8Array(2), ow.uint8Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint8Array);
	}, 'Expected argument to be of type `Uint8Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.uint8Array);
	}, 'Expected argument to be of type `Uint8Array` but received type `number`');
});

test('uint8ClampedArray', t => {
	t.notThrows(() => {
		ow(new Uint8ClampedArray(2), ow.uint8ClampedArray);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint8ClampedArray);
	}, 'Expected argument to be of type `Uint8ClampedArray` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.uint8ClampedArray);
	}, 'Expected argument to be of type `Uint8ClampedArray` but received type `number`');
});

test('int16Array', t => {
	t.notThrows(() => {
		ow(new Int16Array(2), ow.int16Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int16Array);
	}, 'Expected argument to be of type `Int16Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.int16Array);
	}, 'Expected argument to be of type `Int16Array` but received type `number`');
});

test('uint16Array', t => {
	t.notThrows(() => {
		ow(new Uint16Array(2), ow.uint16Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint16Array);
	}, 'Expected argument to be of type `Uint16Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.uint16Array);
	}, 'Expected argument to be of type `Uint16Array` but received type `number`');
});

test('int32Array', t => {
	t.notThrows(() => {
		ow(new Int32Array(2), ow.int32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int32Array);
	}, 'Expected argument to be of type `Int32Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.int32Array);
	}, 'Expected argument to be of type `Int32Array` but received type `number`');
});

test('uint32Array', t => {
	t.notThrows(() => {
		ow(new Uint32Array(2), ow.uint32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint32Array);
	}, 'Expected argument to be of type `Uint32Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.uint32Array);
	}, 'Expected argument to be of type `Uint32Array` but received type `number`');
});

test('float32Array', t => {
	t.notThrows(() => {
		ow(new Float32Array(2), ow.float32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.float32Array);
	}, 'Expected argument to be of type `Float32Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.float32Array);
	}, 'Expected argument to be of type `Float32Array` but received type `number`');
});

test('float64Array', t => {
	t.notThrows(() => {
		ow(new Float64Array(2), ow.float64Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.float64Array);
	}, 'Expected argument to be of type `Float64Array` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.float64Array);
	}, 'Expected argument to be of type `Float64Array` but received type `number`');
});
