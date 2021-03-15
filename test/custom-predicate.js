import test from 'ava';
import ow, {Predicate} from '../source/index.js';

class CustomPredicate extends Predicate {
	constructor() {
		super('string');
	}

	get unicorn() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be \`🦄\`, got \`${value}\``,
			validator: value => value === '🦄'
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
	}, {
		message: 'Expected string `unicorn` to be `🦄`, got `🌈`'
	});
});
