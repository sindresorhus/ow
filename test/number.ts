import test from 'ava';
import ow from '../source/index.js';

test('number', t => {
	t.notThrows(() => {
		ow(1, ow.number);
	});

	t.throws(() => {
		ow('12' as any, ow.number);
	}, {message: 'Expected argument to be of type `number` but received type `string`'});

	t.throws(() => {
		ow(Number.NaN as any, ow.number);
	}, {message: 'Expected argument to be of type `number` but received type `NaN`'});

	t.throws(() => {
		ow('12' as any, 'foo', ow.number);
	}, {message: 'Expected `foo` to be of type `number` but received type `string`'});
});

test('number.inRange', t => {
	t.notThrows(() => {
		ow(10, ow.number.inRange(0, 20));
	});

	t.notThrows(() => {
		ow(10, ow.number.inRange(10, 20));
	});
	t.notThrows(() => {
		ow(10, ow.number.inRange(0, 10));
	});

	t.throws(() => {
		ow(10 as any, ow.number.inRange(0, 9));
	}, {message: 'Expected number to be in range [0..9], got 10'});

	t.throws(() => {
		ow(10 as any, 'foo', ow.number.inRange(0, 9));
	}, {message: 'Expected number `foo` to be in range [0..9], got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.inRange(11, 20));
	}, {message: 'Expected number to be in range [11..20], got 10'});
});

test('number.greaterThan', t => {
	t.notThrows(() => {
		ow(10, ow.number.greaterThan(5));
	});

	t.notThrows(() => {
		ow(10, ow.number.greaterThan(9));
	});

	t.throws(() => {
		ow(10 as any, ow.number.greaterThan(10));
	}, {message: 'Expected number to be greater than 10, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.greaterThan(11));
	}, {message: 'Expected number to be greater than 11, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.greaterThan(20));
	}, {message: 'Expected number to be greater than 20, got 10'});
});

test('number.greaterThanOrEqual', t => {
	t.notThrows(() => {
		ow(10, ow.number.greaterThanOrEqual(5));
	});

	t.notThrows(() => {
		ow(10, ow.number.greaterThanOrEqual(10));
	});

	t.throws(() => {
		ow(10 as any, ow.number.greaterThanOrEqual(11));
	}, {message: 'Expected number to be greater than or equal to 11, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.greaterThanOrEqual(20));
	}, {message: 'Expected number to be greater than or equal to 20, got 10'});
});

test('number.lessThan', t => {
	t.notThrows(() => {
		ow(10, ow.number.lessThan(20));
	});

	t.notThrows(() => {
		ow(10, ow.number.lessThan(11));
	});

	t.throws(() => {
		ow(10 as any, ow.number.lessThan(10));
	}, {message: 'Expected number to be less than 10, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.lessThan(9));
	}, {message: 'Expected number to be less than 9, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.lessThan(0));
	}, {message: 'Expected number to be less than 0, got 10'});
});

test('number.lessThanOrEqual', t => {
	t.notThrows(() => {
		ow(10, ow.number.lessThanOrEqual(20));
	});

	t.notThrows(() => {
		ow(10, ow.number.lessThanOrEqual(10));
	});

	t.throws(() => {
		ow(10 as any, ow.number.lessThanOrEqual(9));
	}, {message: 'Expected number to be less than or equal to 9, got 10'});

	t.throws(() => {
		ow(10 as any, ow.number.lessThanOrEqual(0));
	}, {message: 'Expected number to be less than or equal to 0, got 10'});
});

test('number.equal', t => {
	t.notThrows(() => {
		ow(10, ow.number.equal(10));
	});

	t.throws(() => {
		ow(10 as any, ow.number.equal(5));
	}, {message: 'Expected number to be equal to 5, got 10'});
});

test('number.oneOf', t => {
	t.notThrows(() => {
		ow(10, ow.number.oneOf([5, 10]));
	});

	t.throws(() => {
		ow(10, ow.number.oneOf([5, 6]));
	}, {message: 'Expected number to be one of `[5,6]`, got 10'});

	t.throws(() => {
		ow(10, 'hello', ow.number.oneOf([5, 6]));
	}, {message: 'Expected number `hello` to be one of `[5,6]`, got 10'});

	t.throws(() => {
		ow(10, ow.number.oneOf([5, 6, 7, 8, 9]));
	}, {message: 'Expected number to be one of `[5,6,7,8,9]`, got 10'});

	t.throws(() => {
		ow(10, ow.number.oneOf([5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18]));
	}, {message: 'Expected number to be one of `[5,6,7,8,9,11,12,13,14,15,…+3 more]`, got 10'});
});

test('number.integer', t => {
	t.notThrows(() => {
		ow(10, ow.number.integer);
	});

	t.throws(() => {
		ow(10.1 as any, ow.number.integer);
	}, {message: 'Expected number to be an integer, got 10.1'});
});

test('number.finite', t => {
	t.notThrows(() => {
		ow(10, ow.number.finite);
	});

	t.throws(() => {
		ow(Number.POSITIVE_INFINITY as any, ow.number.finite);
	}, {message: 'Expected number to be finite, got Infinity'});
});

test('number.infinite', t => {
	t.notThrows(() => {
		ow(Number.POSITIVE_INFINITY, ow.number.infinite);
	});

	t.throws(() => {
		ow(10 as any, ow.number.infinite);
	}, {message: 'Expected number to be infinite, got 10'});
});

test('number.positive', t => {
	t.notThrows(() => {
		ow(1, ow.number.positive);
	});

	t.throws(() => {
		ow(-1 as any, ow.number.positive);
	}, {message: 'Expected number to be positive, got -1'});
});

test('number.negative', t => {
	t.notThrows(() => {
		ow(-1, ow.number.negative);
	});

	t.throws(() => {
		ow(1 as any, ow.number.negative);
	}, {message: 'Expected number to be negative, got 1'});
});

test('number.integerOrInfinite', t => {
	t.notThrows(() => {
		ow(10, ow.number.integerOrInfinite);
	});

	t.notThrows(() => {
		ow(Number.POSITIVE_INFINITY, ow.number.integerOrInfinite);
	});

	t.notThrows(() => {
		ow(-10, ow.number.integerOrInfinite);
	});

	t.throws(() => {
		ow(3.14, ow.number.integerOrInfinite);
	}, {message: 'Expected number to be an integer or infinite, got 3.14'});
});

test('number.uint8', t => {
	t.notThrows(() => {
		ow(0, ow.number.uint8);
	});

	t.notThrows(() => {
		ow(255, ow.number.uint8);
	});

	t.throws(() => {
		ow(-1, ow.number.uint8);
	}, {message: 'Expected number to be in range [0..255], got -1'});

	t.throws(() => {
		ow(1.5, ow.number.uint8);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(256, ow.number.uint8);
	}, {message: 'Expected number to be in range [0..255], got 256'});
});

test('number.uint16', t => {
	t.notThrows(() => {
		ow(0, ow.number.uint16);
	});

	t.notThrows(() => {
		ow(65_535, ow.number.uint16);
	});

	t.throws(() => {
		ow(-1, ow.number.uint16);
	}, {message: 'Expected number to be in range [0..65535], got -1'});

	t.throws(() => {
		ow(1.5, ow.number.uint16);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(65_536, ow.number.uint16);
	}, {message: 'Expected number to be in range [0..65535], got 65536'});
});

test('number.uint32', t => {
	t.notThrows(() => {
		ow(0, ow.number.uint32);
	});

	t.notThrows(() => {
		ow(4_294_967_295, ow.number.uint32);
	});

	t.throws(() => {
		ow(-1, ow.number.uint32);
	}, {message: 'Expected number to be in range [0..4294967295], got -1'});

	t.throws(() => {
		ow(1.5, ow.number.uint32);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(4_294_967_296, ow.number.uint32);
	}, {message: 'Expected number to be in range [0..4294967295], got 4294967296'});
});

test('number.int8', t => {
	t.notThrows(() => {
		ow(-128, ow.number.int8);
	});

	t.notThrows(() => {
		ow(127, ow.number.int8);
	});

	t.throws(() => {
		ow(-129, ow.number.int8);
	}, {message: 'Expected number to be in range [-128..127], got -129'});

	t.throws(() => {
		ow(1.5, ow.number.int8);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(128, ow.number.int8);
	}, {message: 'Expected number to be in range [-128..127], got 128'});
});

test('number.int16', t => {
	t.notThrows(() => {
		ow(-32_768, ow.number.int16);
	});

	t.notThrows(() => {
		ow(32_767, ow.number.int16);
	});

	t.throws(() => {
		ow(-32_769, ow.number.int16);
	}, {message: 'Expected number to be in range [-32768..32767], got -32769'});

	t.throws(() => {
		ow(1.5, ow.number.int16);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(32_768, ow.number.int16);
	}, {message: 'Expected number to be in range [-32768..32767], got 32768'});
});

test('number.int32', t => {
	t.notThrows(() => {
		ow(-2_147_483_648, ow.number.int32);
	});

	t.notThrows(() => {
		ow(2_147_483_647, ow.number.int32);
	});

	t.throws(() => {
		ow(-2_147_483_649, ow.number.int32);
	}, {message: 'Expected number to be in range [-2147483648..2147483647], got -2147483649'});

	t.throws(() => {
		ow(1.5, ow.number.int32);
	}, {message: 'Expected number to be an integer, got 1.5'});

	t.throws(() => {
		ow(2_147_483_648, ow.number.int32);
	}, {message: 'Expected number to be in range [-2147483648..2147483647], got 2147483648'});
});
