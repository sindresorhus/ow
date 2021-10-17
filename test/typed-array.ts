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
	}, { message: 'Expected argument to be of type `TypedArray` but received type `string`' });

	t.throws(() => {
		ow('foo' as any, 'foo', ow.typedArray);
	}, { message: 'Expected `foo` to be of type `TypedArray` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.typedArray);
	}, { message: 'Expected argument to be of type `TypedArray` but received type `number`' });
});

test('typedArray.byteLength', t => {
	t.notThrows(() => {
		ow(new Int8Array(1), ow.typedArray.byteLength(1));
	});

	t.notThrows(() => {
		ow(new Uint8Array(1), ow.typedArray.byteLength(1));
	});

	t.notThrows(() => {
		ow(new Uint8ClampedArray(1), ow.typedArray.byteLength(1));
	});

	t.notThrows(() => {
		ow(new Int16Array(1), ow.typedArray.byteLength(2));
	});

	t.notThrows(() => {
		ow(new Uint16Array(1), ow.typedArray.byteLength(2));
	});

	t.notThrows(() => {
		ow(new Int32Array(1), ow.typedArray.byteLength(4));
	});

	t.notThrows(() => {
		ow(new Uint32Array(1), ow.typedArray.byteLength(4));
	});

	t.notThrows(() => {
		ow(new Float32Array(1), ow.typedArray.byteLength(4));
	});

	t.notThrows(() => {
		ow(new Float64Array(1), ow.typedArray.byteLength(8));
	});

	t.throws(() => {
		ow(new Int8Array(1), ow.typedArray.byteLength(2));
	}, { message: 'Expected TypedArray to have byte length of `2`, got `1`' });

	t.throws(() => {
		ow(new Int8Array(1), 'foo', ow.typedArray.byteLength(2));
	}, { message: 'Expected TypedArray `foo` to have byte length of `2`, got `1`' });
});

test('typedArray.minByteLength', t => {
	t.notThrows(() => {
		ow(new Int8Array(1), ow.typedArray.minByteLength(1));
	});

	t.notThrows(() => {
		ow(new Float64Array(2), ow.typedArray.minByteLength(1));
	});

	t.throws(() => {
		ow(new Uint8Array(1), ow.typedArray.minByteLength(2));
	}, { message: 'Expected TypedArray to have a minimum byte length of `2`, got `1`' });
});

test('typedArray.maxByteLength', t => {
	t.notThrows(() => {
		ow(new Uint8Array(1), ow.typedArray.maxByteLength(1));
	});

	t.notThrows(() => {
		ow(new Int16Array(1), ow.typedArray.maxByteLength(4));
	});

	t.throws(() => {
		ow(new Uint32Array(1), ow.typedArray.maxByteLength(1));
	}, { message: 'Expected TypedArray to have a maximum byte length of `1`, got `4`' });
});

test('typedArray.length', t => {
	t.notThrows(() => {
		t.notThrows(() => {
			ow(new Int8Array(1), ow.typedArray.length(1));
		});

		t.notThrows(() => {
			ow(new Uint16Array(2), ow.typedArray.length(2));
		});

		t.throws(() => {
			ow(new Float32Array(1), ow.typedArray.length(2));
		}, { message: 'Expected TypedArray to have length `2`, got `1`' });

		t.throws(() => {
			ow(new Float32Array(1), 'foo', ow.typedArray.length(2));
		}, { message: 'Expected TypedArray `foo` to have length `2`, got `1`' });
	});
});

test('typedArray.minLength', t => {
	t.notThrows(() => {
		ow(new Uint8Array(1), ow.typedArray.minLength(1));
	});

	t.notThrows(() => {
		ow(new Int16Array(2), ow.typedArray.minLength(1));
	});

	t.throws(() => {
		ow(new Uint32Array(1), ow.typedArray.minLength(2));
	}, { message: 'Expected TypedArray to have a minimum length of `2`, got `1`' });
});

test('typedArray.maxLength', t => {
	t.notThrows(() => {
		ow(new Uint8ClampedArray(1), ow.typedArray.maxLength(1));
	});

	t.notThrows(() => {
		ow(new Int32Array(2), ow.typedArray.maxLength(4));
	});

	t.throws(() => {
		ow(new Float64Array(2), ow.typedArray.maxLength(1));
	}, { message: 'Expected TypedArray to have a maximum length of `1`, got `2`' });
});

test('int8Array', t => {
	t.notThrows(() => {
		ow(new Int8Array(2), ow.int8Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int8Array);
	}, { message: 'Expected argument to be of type `Int8Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.int8Array);
	}, { message: 'Expected argument to be of type `Int8Array` but received type `number`' });
});

test('uint8Array', t => {
	t.notThrows(() => {
		ow(new Uint8Array(2), ow.uint8Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint8Array);
	}, { message: 'Expected argument to be of type `Uint8Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.uint8Array);
	}, { message: 'Expected argument to be of type `Uint8Array` but received type `number`' });
});

test('uint8ClampedArray', t => {
	t.notThrows(() => {
		ow(new Uint8ClampedArray(2), ow.uint8ClampedArray);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint8ClampedArray);
	}, { message: 'Expected argument to be of type `Uint8ClampedArray` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.uint8ClampedArray);
	}, { message: 'Expected argument to be of type `Uint8ClampedArray` but received type `number`' });
});

test('int16Array', t => {
	t.notThrows(() => {
		ow(new Int16Array(2), ow.int16Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int16Array);
	}, { message: 'Expected argument to be of type `Int16Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.int16Array);
	}, { message: 'Expected argument to be of type `Int16Array` but received type `number`' });
});

test('uint16Array', t => {
	t.notThrows(() => {
		ow(new Uint16Array(2), ow.uint16Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint16Array);
	}, { message: 'Expected argument to be of type `Uint16Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.uint16Array);
	}, { message: 'Expected argument to be of type `Uint16Array` but received type `number`' });
});

test('int32Array', t => {
	t.notThrows(() => {
		ow(new Int32Array(2), ow.int32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.int32Array);
	}, { message: 'Expected argument to be of type `Int32Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.int32Array);
	}, { message: 'Expected argument to be of type `Int32Array` but received type `number`' });
});

test('uint32Array', t => {
	t.notThrows(() => {
		ow(new Uint32Array(2), ow.uint32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.uint32Array);
	}, { message: 'Expected argument to be of type `Uint32Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.uint32Array);
	}, { message: 'Expected argument to be of type `Uint32Array` but received type `number`' });
});

test('float32Array', t => {
	t.notThrows(() => {
		ow(new Float32Array(2), ow.float32Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.float32Array);
	}, { message: 'Expected argument to be of type `Float32Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.float32Array);
	}, { message: 'Expected argument to be of type `Float32Array` but received type `number`' });
});

test('float64Array', t => {
	t.notThrows(() => {
		ow(new Float64Array(2), ow.float64Array);
	});

	t.throws(() => {
		ow('foo' as any, ow.float64Array);
	}, { message: 'Expected argument to be of type `Float64Array` but received type `string`' });

	t.throws(() => {
		ow(12 as any, ow.float64Array);
	}, { message: 'Expected argument to be of type `Float64Array` but received type `number`' });
});
