import predicates, {type Predicates} from './predicates.js';
import {type absentSymbol} from './predicates/base-predicate.js';
import type {BasePredicate} from './index.js';

type Optionalify<P> = P extends BasePredicate<infer X>
	? P & BasePredicate<X | undefined>
	: P;

type Nullify<P> = P extends BasePredicate<infer X>
	? P & BasePredicate<X | null>
	: P;

type Absentify<P> = P extends BasePredicate<infer X>
	? P & BasePredicate<X> & {[absentSymbol]: true}
	: P;

export type Modifiers = {
	/**
	Make the following predicate optional so it doesn't fail when the value is `undefined`.
	*/
	readonly optional: {
		[K in keyof Predicates]: Optionalify<Predicates[K]>
	};

	/**
	Make the following predicate nullable so it doesn't fail when the value is `null`.
	*/
	readonly nullable: {
		[K in keyof Predicates]: Nullify<Predicates[K]>
	};

	/**
	Mark the following property as absent, meaning the key can be missing from objects entirely.
	This is different from `optional` which allows both missing keys AND `undefined` values.

	@example
	```
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
			...patchBody, // Type-safe object spreading
		};
	}

	const dog = {length: 10, topping: 'mustard'};

	patchHotdog(dog, {length: 12}); // ✓ Partial update
	patchHotdog(dog, {}); // ✓ Empty update
	patchHotdog(dog, {length: 12, topping: 'ketchup'}); // ✓ Full update
	patchHotdog(dog, {length: 'twelve'}); // ✗ Wrong type
	```

	This is particularly useful for:
	- Patch/update operations where missing keys mean "don't change"
	- Partial form submissions
	- Configuration merging where only specified keys should be overridden

	**Key differences from `optional`:**

	At runtime, both modifiers allow missing keys. The difference is in how they handle undefined values and type inference:

	```
	// optional: allows missing keys AND undefined values
	// Type inference: { name: string | undefined }
	ow({}, ow.object.exactShape({
		name: ow.optional.string // ✓ Valid - missing key
	}));
	ow({name: undefined}, ow.object.exactShape({
		name: ow.optional.string // ✓ Valid - undefined value
	}));

	// absent: allows missing keys but NOT undefined values
	// Type inference: { name?: string }
	ow({}, ow.object.exactShape({
		name: ow.absent.string // ✓ Valid - missing key
	}));
	ow({name: undefined}, ow.object.exactShape({
		name: ow.absent.string // ✗ Invalid - undefined not allowed
	}));
	```

	The key distinction: use `.absent` when missing keys mean "don't change" (patch operations), and `.optional` when undefined is a valid value.
	*/
	readonly absent: {
		[K in keyof Predicates]: Absentify<Predicates[K]>
	};
};

const modifiers = <T>(object: T): T & Modifiers => {
	Object.defineProperties(object, {
		optional: {
			get(): Predicates {
				return predicates({}, {optional: true});
			},
		},
		nullable: {
			get(): Predicates {
				return predicates({}, {nullable: true});
			},
		},
		absent: {
			get(): Predicates {
				return predicates({}, {absent: true});
			},
		},
	});

	return object as T & Modifiers;
};

export default modifiers;
