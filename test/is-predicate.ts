import test from 'ava';
import ow, {isPredicate} from '../source/index.js';

test('ow.isPredicate identifies predicates correctly', t => {
	// Test basic predicates
	t.true(ow.isPredicate(ow.string));
	t.true(ow.isPredicate(ow.number));
	t.true(ow.isPredicate(ow.boolean));
	t.true(ow.isPredicate(ow.object));
	t.true(ow.isPredicate(ow.array));

	// Test chained predicates
	t.true(ow.isPredicate(ow.string.minLength(5)));
	t.true(ow.isPredicate(ow.number.positive));

	// Test predicates with modifiers
	t.true(ow.isPredicate(ow.optional.string));
	t.true(ow.isPredicate(ow.nullable.number));

	// Test any predicates
	t.true(ow.isPredicate(ow.any(ow.string, ow.number)));

	// Test non-predicates
	t.false(ow.isPredicate({}));
	t.false(ow.isPredicate(() => {}));
	t.false(ow.isPredicate('string'));
	t.false(ow.isPredicate(42));
	t.false(ow.isPredicate(null));
	t.false(ow.isPredicate(undefined));

	// Test reusable validators are not predicates
	const validator = ow.create(ow.string);
	t.false(ow.isPredicate(validator));
});

test('isPredicate direct import works identically', t => {
	t.true(isPredicate(ow.string));
	t.true(isPredicate(ow.number));
	t.true(isPredicate(ow.any(ow.string, ow.number)));
	t.false(isPredicate({}));
	t.false(isPredicate('string'));
});

test('isPredicate is available on ow object', t => {
	t.true('isPredicate' in ow);
	t.is(typeof ow.isPredicate, 'function');
});
