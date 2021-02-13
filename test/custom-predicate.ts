import test from 'ava';
import ow, {Predicate} from '../source';

class CustomPredicate extends Predicate<string> {
	constructor() {
		super('string');
	}

	get unicorn(): this {
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
	}, 'Expected string `unicorn` to be `🦄`, got `🌈`');
});
