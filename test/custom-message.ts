import test from 'ava';
import {default as ow, Predicate} from '../source';

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

test('custom validate message', t => {
	t.throws(() => {
		ow('🌈', 'unicorn', new CustomPredicate().unicorn.message('Expect unicorn, got rainbow'));
	}, 'Expect unicorn, got rainbow');

	t.throws(() => {
		ow('🌈', 'unicorn', new CustomPredicate().unicorn.message((value, label) => `Expected ${label}, to be \`🦄\` got \`${value}\``));
	}, 'Expected string `unicorn`, to be `🦄` got `🌈`');

	t.throws(() => {
		ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to be have a minimum length of 5, got \`${value}\``));
	}, 'Expected string, to be have a minimum length of 5, got `🌈`');

	t.throws(() => {
		ow('1234', ow.string.minLength(5).message((value, label) => `Expected ${label}, to be have a minimum length of 5, got \`${value}\``).url.message('This is no url'));
	}, 'Expected string, to be have a minimum length of 5, got `1234`');

	t.throws(() => {
		ow('12345', ow.string.minLength(5).message((value, label) => `Expected ${label}, to be have a minimum length of 5, got \`${value}\``).url.message('This is no url'));
	}, 'This is no url');
});
