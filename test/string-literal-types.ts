import test from 'ava';
import ow from '../source/index.js';

// Test literal type narrowing
function validateExactString(value: unknown): 'hello' {
	ow(value, ow.string.equals('hello'));
	return value;
}

function validateColor(value: unknown): 'red' | 'green' | 'blue' {
	ow(value, ow.string.oneOf(['red', 'green', 'blue']));
	return value;
}

// Tagged union from issue #235
type Food = {type: 'carrot'} | {type: 'hotdog'};

function validateFood(input: unknown): Food {
	ow(input, ow.any(
		ow.object.exactShape({type: ow.string.equals('carrot')}),
		ow.object.exactShape({type: ow.string.equals('hotdog')}),
	));
	return input;
}

test('string.equals narrows to literal type', t => {
	const result = validateExactString('hello');
	t.is(result, 'hello');
	const _check: 'hello' = result;
});

test('string.oneOf narrows to union type', t => {
	const result = validateColor('red');
	t.is(result, 'red');
	const _check: 'red' | 'green' | 'blue' = result;
});

test('tagged union validation works', t => {
	const food = validateFood({type: 'carrot'});
	t.is(food.type, 'carrot');
	const _check: Food = food;
});
