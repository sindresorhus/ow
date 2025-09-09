import test from 'ava';
import ow, {
	Predicate,
	type PredicateOptions,
	type Validator,
} from '../source/index.js';

class CustomPredicate extends Predicate<string> {
	constructor(options?: PredicateOptions, validators?: Array<Validator<string>>) {
		super('string', options, validators);
	}

	get unicorn(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be \`🦄\`, got \`${value}\``,
			validator: value => value === '🦄',
		});
	}
}

const custom = new CustomPredicate();

test('custom predicates', t => {
	t.notThrows(() => {
		ow('🦄', custom.unicorn);
	});

	t.throws(() => {
		ow('🌈', 'unicorn', custom.unicorn);
	}, {message: 'Expected string `unicorn` to be `🦄`, got `🌈`'});
});
