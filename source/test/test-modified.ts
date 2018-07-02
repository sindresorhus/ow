// tslint:disable
import m from '..';

interface TestContext {
	notThrows(cb: any): void;
	throws(cb: any, message?: string): void;
	true(value: any): void;
	false(value: any): void;
}

const test = (title: string, fn: (t: TestContext) => void) => {
	console.log(`Execute \`${title}\``);

	const testContext: TestContext = {
		notThrows: (cb: any) => cb(),
		throws: (cb: any, message?: string) => {
			try {
				cb();
				throw new Error(`Expected ${title} to throw, it did not`)
			} catch (err) {
				if (!message || err.message === message) {
					return;
				}

				console.log(err.message, message);

				throw err;
			}
		},
		true: (_: any) => {},
		false: (_: any) => {}
	};

	try {
		fn(testContext);
	} catch (err) {
		console.log('>> ', err.message);
	}
};

test('not', t => {
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.notThrows(() => m(1, m.number.not.infinite));
	t.notThrows(() => m(1, m.number.not.infinite.not.greaterThan(5)));
	t.throws(() => m(6, m.number.not.infinite.not.greaterThan(5)));
	t.notThrows(() => m('foo!', m.string.not.alphabetical));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.notThrows(() => m('foo!', m.string.label('foo').not.alphanumeric));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric.label('foo')));
	t.notThrows(() => m('FOO!', m.string.not.lowercase));
	t.notThrows(() => m('foo!', m.string.not.uppercase));
	t.throws(() => m('', m.string.not.empty), '[NOT] Expected string to be empty, got ``');
	t.throws(() => m('', m.string.label('foo').not.empty), '[NOT] Expected string `foo` to be empty, got ``');
});

test('is', t => {
	const greaterThan = (max: number, x: number) => {
		return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
	};

	t.notThrows(() => m(1, m.number.is(x => x < 10)));
	t.notThrows(() => m(1, m.number.label('foo').is(x => x < 10)));
	t.throws(() => m(1, m.number.is(x => x > 10)), 'Expected number `1` to pass custom validation function');
	t.throws(() => m(1, m.number.label('foo').is(x => x > 10)), 'Expected number `foo` `1` to pass custom validation function');
	t.throws(() => m(5, m.number.is(x => greaterThan(10, x))), '(number) Expected `5` to be greater than `10`');
	t.throws(() => m(5, m.number.label('foo').is(x => greaterThan(10, x))), '(number `foo`) Expected `5` to be greater than `10`');
});

test('isValid', t => {
	t.true(m.isValid(1, m.number));
	t.true(m.isValid(1, m.number.equal(1)));
	t.true(m.isValid('foo!', m.string.not.alphanumeric));
	t.false(m.isValid(1 as any, m.string));
	t.false(m.isValid(1 as any, m.number.greaterThan(2)));
});

test('reusable validator', t => {
	const checkUsername = m.create(m.string.minLength(3));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('foobar'));
	t.throws(() => checkUsername('fo'), 'Expected string to have a minimum length of `3`, got `fo`');
	t.throws(() => checkUsername(5 as any), 'Expected argument to be of type `string` but received type `number`');
});

test('reusable validator with label', t => {
	const checkUsername = m.create(m.string.label('foo').minLength(3));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('foobar'));
	t.throws(() => checkUsername('fo'), 'Expected string `foo` to have a minimum length of `3`, got `fo`');
	t.throws(() => checkUsername(5 as any), 'Expected `foo` to be of type `string` but received type `number`');
});

test('overwrite label', t => {
	t.notThrows(() => m('foo', m.string.label('foo').label('bar')));
	t.throws(() => m(12 as any, m.string.label('foo').label('bar')), 'Expected `bar` to be of type `string` but received type `number`');
});

test('auto detect label', t => {
	const x = 'f';

	t.throws(() => m(x as any, m.string.minLength(2)), 'Expected string `x` to have a minimum length of `2`, got `f`');
});
