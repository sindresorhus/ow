import test from 'ava';
import ow from '../source';

class CustomError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CustomError';
	}
}

test('error', t => {
	t.notThrows(() => {
		ow(new Error('foo'), ow.error);
	});

	t.throws(() => {
		ow('12' as any, ow.error);
	}, 'Expected argument to be of type `error` but received type `string`');

	t.throws(() => {
		ow('12' as any, 'err', ow.error);
	}, 'Expected `err` to be of type `error` but received type `string`');
});

test('error.name', t => {
	t.notThrows(() => {
		ow(new Error('foo'), ow.error.name('Error'));
	});

	t.notThrows(() => {
		ow(new CustomError('foo'), ow.error.name('CustomError'));
	});

	t.notThrows(() => {
		ow(new CustomError('foo'), 'err', ow.error.name('CustomError'));
	});

	t.throws(() => {
		ow(new CustomError('foo'), ow.error.name('Error'));
	}, 'Expected error to have name `Error`, got `CustomError`');

	t.throws(() => {
		ow(new CustomError('foo'), 'err', ow.error.name('Error'));
	}, 'Expected error `err` to have name `Error`, got `CustomError`');
});

test('error.message', t => {
	t.notThrows(() => {
		ow(new Error('foo'), ow.error.message('foo'));
	});

	t.notThrows(() => {
		ow(new CustomError('bar'), ow.error.message('bar'));
	});

	t.throws(() => {
		ow(new CustomError('foo'), ow.error.message('bar'));
	}, 'Expected error message to be `bar`, got `foo`');
});

test('error.messageIncludes', t => {
	t.notThrows(() => {
		ow(new Error('foo bar'), ow.error.messageIncludes('foo'));
	});

	t.notThrows(() => {
		ow(new Error('foo bar'), ow.error.messageIncludes('o'));
	});

	t.notThrows(() => {
		ow(new CustomError('foo bar'), ow.error.messageIncludes('bar'));
	});

	t.throws(() => {
		ow(new CustomError('foo bar'), ow.error.messageIncludes('unicorn'));
	}, 'Expected error message to include `unicorn`, got `foo bar`');
});

test('error.hasKeys', t => {
	const error: any = new Error('foo');
	error.unicorn = '🦄';
	error.rainbow = '🌈';

	t.notThrows(() => {
		ow(error, ow.error.hasKeys('unicorn'));
	});

	t.notThrows(() => {
		ow(error, ow.error.hasKeys('unicorn', 'rainbow'));
	});

	t.throws(() => {
		ow(error, ow.error.hasKeys('foo'));
	}, 'Expected error `error` message to have keys `foo`');

	t.throws(() => {
		ow(error, ow.error.hasKeys('unicorn', 'foo'));
	}, 'Expected error `error` message to have keys `unicorn`, `foo`');
});

test('error.instanceOf', t => {
	t.notThrows(() => {
		ow(new CustomError('foo'), ow.error.instanceOf(CustomError));
	});

	t.notThrows(() => {
		ow(new CustomError('foo'), ow.error.instanceOf(Error));
	});

	t.notThrows(() => {
		ow(new TypeError('foo'), ow.error.instanceOf(Error));
	});

	t.notThrows(() => {
		ow(new Error('foo'), ow.error.instanceOf(Error));
	});

	t.notThrows(() => {
		ow(new Error('foo'), 'err', ow.error.instanceOf(Error));
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.instanceOf(CustomError));
	}, 'Expected error `Error` to be of type `CustomError`');

	t.throws(() => {
		ow(new Error('foo'), 'err', ow.error.instanceOf(CustomError));
	}, 'Expected error `err` `Error` to be of type `CustomError`');

	t.throws(() => {
		ow(new TypeError('foo'), ow.error.instanceOf(EvalError));
	}, 'Expected error `TypeError` to be of type `EvalError`');

	t.throws(() => {
		ow(new TypeError('foo'), 'err', ow.error.instanceOf(EvalError));
	}, 'Expected error `err` `TypeError` to be of type `EvalError`');
});

test('error.typeError', t => {
	t.notThrows(() => {
		ow(new TypeError('foo'), ow.error.typeError);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.typeError);
	}, 'Expected error `Error` to be of type `TypeError`');

	t.throws(() => {
		ow(new Error('foo'), 'foo', ow.error.typeError);
	}, 'Expected error `foo` `Error` to be of type `TypeError`');
});

test('error.evalError', t => {
	t.notThrows(() => {
		ow(new EvalError('foo'), ow.error.evalError);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.evalError);
	}, 'Expected error `Error` to be of type `EvalError`');
});

test('error.rangeError', t => {
	t.notThrows(() => {
		ow(new RangeError('foo'), ow.error.rangeError);
	});

	t.throws(() => {
		ow(new EvalError('foo'), ow.error.rangeError);
	}, 'Expected error `EvalError` to be of type `RangeError`');
});

test('error.referenceError', t => {
	t.notThrows(() => {
		ow(new ReferenceError('foo'), ow.error.referenceError);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.referenceError);
	}, 'Expected error `Error` to be of type `ReferenceError`');
});

test('error.syntaxError', t => {
	t.notThrows(() => {
		ow(new SyntaxError('foo'), ow.error.syntaxError);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.syntaxError);
	}, 'Expected error `Error` to be of type `SyntaxError`');
});

test('error.uriError', t => {
	t.notThrows(() => {
		ow(new URIError('foo'), ow.error.uriError);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.error.uriError);
	}, 'Expected error `Error` to be of type `URIError`');
});
