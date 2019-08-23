import test from 'ava';
import  { default as ow, Predicate } from '../source';

class CustomPredicate extends Predicate<any> {
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

test('custom validate message', t => {
	t.throws(() => {
		ow('🌈', 'unicorn', custom.unicorn.validateMessage("Expect unicorn, got rainbow"));
	}, 'Expect unicorn, got rainbow');
});