import test from 'ava';
import ow from '../source/index.js';

test('predicates are now immutable - storing them does not cause issues', t => {
	// Store a reference to ow.array
	const arrayPredicate = ow.array;

	// First use - should work fine
	t.notThrows(() => {
		ow([1, 2, 3], arrayPredicate);
	});

	// Second use with ofType - creates a new predicate, doesn't modify the original
	t.notThrows(() => {
		ow(['a', 'b', 'c'], arrayPredicate.ofType(ow.string));
	});

	// Third use - still works with numbers because arrayPredicate was NOT mutated
	t.notThrows(() => {
		ow([1, 2, 3], arrayPredicate);
	});
});

test('string predicates are immutable', t => {
	const stringPredicate = ow.string;

	// First use - any string is valid
	t.notThrows(() => {
		ow('hello', stringPredicate);
	});

	// Second use with minLength - creates a new predicate, doesn't modify the original
	t.notThrows(() => {
		ow('hello world', stringPredicate.minLength(10));
	});

	// Third use - short strings still work because stringPredicate was NOT mutated
	t.notThrows(() => {
		ow('hi', stringPredicate);
	});
});

test('demonstrates that accessing ow.array each time works correctly', t => {
	// This works because each access to ow.array returns a new instance
	t.notThrows(() => {
		ow([1, 2, 3], ow.array);
	});

	t.notThrows(() => {
		ow(['a', 'b', 'c'], ow.array.ofType(ow.string));
	});

	// This still works because we're getting a fresh predicate
	t.notThrows(() => {
		ow([1, 2, 3], ow.array);
	});
});

test('chained validators create new instances', t => {
	const numberPredicate = ow.number;

	// First use
	t.notThrows(() => {
		ow(5, numberPredicate);
	});

	// Chain multiple validators - each one returns a new instance
	const chained = numberPredicate.positive.integer.lessThan(10);

	// The original numberPredicate and chained are DIFFERENT objects
	t.not(numberPredicate, chained);

	// The original numberPredicate still accepts any number
	t.notThrows(() => {
		ow(-5, numberPredicate);
	});

	t.notThrows(() => {
		ow(5.5, numberPredicate);
	});

	t.notThrows(() => {
		ow(15, numberPredicate);
	});

	// But the chained predicate has all the validators
	t.throws(() => {
		ow(-5, chained);
	}, {message: /Expected number to be positive, got -5/});

	t.throws(() => {
		ow(5.5, chained);
	}, {message: /Expected number to be an integer, got 5.5/});

	t.throws(() => {
		ow(15, chained);
	}, {message: /Expected number to be less than 10, got 15/});
});
