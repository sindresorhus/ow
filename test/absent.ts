import test from 'ava';
import ow from '../source/index.js';

test('absent modifier allows properties to be missing', t => {
	t.notThrows(() => {
		ow(
			{},
			ow.object.exactShape({
				name: ow.absent.string,
			}),
		);
	});

	t.notThrows(() => {
		ow(
			{name: 'Alice'},
			ow.object.exactShape({
				name: ow.absent.string,
			}),
		);
	});
});

test('absent modifier rejects undefined values', t => {
	t.throws(() => {
		ow(
			{name: undefined},
			ow.object.exactShape({
				name: ow.absent.string,
			}),
		);
	}, {message: /Expected property `name` to be of type `string`/});
});

test('absent vs optional behavior', t => {
	// Optional: allows both missing keys AND undefined values
	t.notThrows(() => {
		ow({}, ow.object.exactShape({name: ow.optional.string}));
	});

	t.notThrows(() => {
		ow({name: undefined}, ow.object.exactShape({name: ow.optional.string}));
	});

	// Absent: allows missing keys but NOT undefined values
	t.notThrows(() => {
		ow({}, ow.object.exactShape({name: ow.absent.string}));
	});

	t.throws(() => {
		ow({name: undefined}, ow.object.exactShape({name: ow.absent.string}));
	});
});

test('absent modifier with patch operations', t => {
	type Hotdog = {
		length: number;
		topping: string;
	};

	function patchHotdog(hotdog: Hotdog, patchBody: unknown): Hotdog {
		ow(
			patchBody,
			ow.object.exactShape({
				length: ow.absent.number,
				topping: ow.absent.string,
			}),
		);

		return {
			...hotdog,
			...patchBody,
		};
	}

	const dog = {length: 10, topping: 'mustard'};

	t.deepEqual(
		patchHotdog(dog, {length: 12, topping: 'ketchup'}),
		{length: 12, topping: 'ketchup'},
	);

	t.deepEqual(
		patchHotdog(dog, {length: 12}),
		{length: 12, topping: 'mustard'},
	);

	t.deepEqual(
		patchHotdog(dog, {}),
		{length: 10, topping: 'mustard'},
	);

	t.throws(() => {
		patchHotdog(dog, {length: 'twelve'});
	}, {message: /Expected property `length` to be of type `number`/});
});

test('absent modifier with nested objects', t => {
	t.notThrows(() => {
		ow(
			{user: {}},
			ow.object.exactShape({
				user: ow.object.exactShape({
					name: ow.absent.string,
					age: ow.absent.number,
				}),
			}),
		);
	});

	t.notThrows(() => {
		ow(
			{user: {name: 'Alice'}},
			ow.object.exactShape({
				user: ow.object.exactShape({
					name: ow.absent.string,
					age: ow.absent.number,
				}),
			}),
		);
	});
});

test('absent modifier with partialShape', t => {
	t.notThrows(() => {
		ow(
			{},
			ow.object.partialShape({
				name: ow.absent.string,
				age: ow.absent.number,
			}),
		);
	});

	t.notThrows(() => {
		ow(
			{name: 'Alice', age: 30, extra: 'allowed'},
			ow.object.partialShape({
				name: ow.absent.string,
				age: ow.absent.number,
			}),
		);
	});
});

test('mixing required, optional, and absent properties', t => {
	t.notThrows(() => {
		ow(
			{
				id: 123,
				name: undefined,
			},
			ow.object.exactShape({
				id: ow.number,
				name: ow.optional.string,
				bio: ow.absent.string,
			}),
		);
	});

	t.notThrows(() => {
		ow(
			{
				id: 123,
				name: undefined,
				bio: 'Hello',
			},
			ow.object.exactShape({
				id: ow.number,
				name: ow.optional.string,
				bio: ow.absent.string,
			}),
		);
	});
});
