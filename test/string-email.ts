import test from 'ava';
import ow from '../source/index.js';

test('string.email exists and works correctly', t => {
	// This test verifies that string.email now exists
	// addressing issue #155

	const emailValidator = ow.string.email;
	t.truthy(emailValidator);
});

test('README example now works correctly', t => {
	// The README shows this example which now works:
	// ow(email, ow.string.email);

	t.notThrows(() => {
		ow('test@example.com', ow.string.email);
	});

	t.throws(() => {
		ow('invalid-email', ow.string.email);
	}, {message: /Expected string to be an email address/});
});

test('workaround using string.includes for basic email check', t => {
	// As suggested in the issue comment, basic check can use includes('@')
	const basicEmailValidator = ow.string.includes('@');

	t.notThrows(() => {
		ow('test@example.com', basicEmailValidator);
	});

	t.throws(() => {
		ow('not-an-email', basicEmailValidator);
	}, {message: /Expected string to include `@`, got `not-an-email`/});
});

test('workaround using custom validator for email', t => {
	// More sophisticated email validation using custom validator
	const emailValidator = ow.string.validate(value => {
		// Very basic email regex - not comprehensive
		const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return {
			validator: basicEmailRegex.test(value),
			message: `Expected a valid email address, got \`${value}\``,
		};
	});

	t.notThrows(() => {
		ow('test@example.com', emailValidator);
	});

	t.notThrows(() => {
		ow('user.name+tag@example.co.uk', emailValidator);
	});

	t.throws(() => {
		ow('not-an-email', emailValidator);
	}, {message: /Expected a valid email address/});

	t.throws(() => {
		ow('missing-at.com', emailValidator);
	}, {message: /Expected a valid email address/});

	t.throws(() => {
		ow('@example.com', emailValidator);
	}, {message: /Expected a valid email address/});
});

test('string.email - valid email addresses', t => {
	// Basic valid emails
	const validEmails = [
		'foo@example.com',
		'test@test.org',
		'user@subdomain.example.com',
		'user.name@example.com',
		'user+tag@example.co.uk',
		'customer/department=shipping@example.com',
		'$A12345@example.com',
		'!def!xyz%abc@example.com',
		'_somename@example.com',
		'user@localhost.localdomain',
		'test@example.com',
		'TEST@EXAMPLE.COM',
		'1234567890@example.com',
		'email@example-one.com',
		'_______@example.com',
		'email@example.name',
		'email@example.museum',
		'email@example.co.jp',
		'firstname-lastname@example.com',
		// Complex quoted strings excluded for practical reasons
		'user%example.com@example.org',
		'user@example.com',
		'user.name+tag+sorting@example.com',
		'x@example.com',
		'example@s.example',
		'"john..doe"@example.org',
		'"john.doe"@example.org',
		'mailhost!username@example.org',
		'user%example.com@example.org',
		'user-@example.org',
	];

	for (const email of validEmails) {
		t.notThrows(() => {
			ow(email, ow.string.email);
		}, `Should accept valid email: ${email}`);
	}
});

test('string.email - invalid email addresses', t => {
	const invalidEmails = [
		'',
		'plainaddress',
		'@missinglocal.com',
		'missing@domain',
		'missing.domain@.com',
		'two@@example.com',
		'wrong@.example.com',
		'.wrong@example.com',
		'wrong.@example.com',
		'wrong..dot@example.com',
		'wrong@example..com',
		'wrong@example.com.',
		'wrong@example .com',
		'wrong@exa mple.com',
		'wrong@-example.com',
		'wrong@example-.com',
		'wr ong@example.com',
		'wrong@example',
		'wrong@111.222.333.44444',
		'user@',
		'@example.com',
		'user name@example.com',
		'user@exam ple.com',
		'user@.example.com',
		'user@example.',
		'user@example.c',
		'user@@example.com',
		'user@exam@ple.com',
		'user..name@example.com',
		'.username@example.com',
		'username.@example.com',
		'username@.com',
		'username@example..com',
		'username@example.c',
		'username@-example.com',
		'username@example-.com',
		'username@exam_ple.com',
		'user name@example.com',
		'user\tname@example.com',
		'user\nname@example.com',
		// Missing @ symbol
		'notanemail.com',
		'not.an.email.com',
		// Multiple @ symbols (outside quotes)
		'user@@example.com',
		'user@exam@ple.com',
	];

	for (const email of invalidEmails) {
		t.throws(() => {
			ow(email, ow.string.email);
		}, {
			message: new RegExp(`Expected string to be an email address, got \\\`${email.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)}\\\``),
		}, `Should reject invalid email: ${email}`);
	}
});

test('string.email - edge cases', t => {
	// Maximum length local part (64 characters)
	const maxLocalPart = 'a'.repeat(64) + '@example.com';
	t.notThrows(() => {
		ow(maxLocalPart, ow.string.email);
	});

	// Too long local part (65 characters)
	const tooLongLocalPart = 'a'.repeat(65) + '@example.com';
	t.throws(() => {
		ow(tooLongLocalPart, ow.string.email);
	}, {message: /Expected string to be an email address/});

	// Maximum length domain (under 255 characters)
	const validDomain = 'a@' + 'a'.repeat(60) + '.' + 'b'.repeat(60) + '.com';
	t.notThrows(() => {
		ow(validDomain, ow.string.email);
	});

	// Too long domain (256 characters)
	const tooLongDomain = 'a@' + 'a'.repeat(250) + '.com';
	t.throws(() => {
		ow(tooLongDomain, ow.string.email);
	}, {message: /Expected string to be an email address/});

	// Minimum valid email
	t.notThrows(() => {
		ow('a@b.co', ow.string.email);
	});

	// IPv4 address literal
	t.notThrows(() => {
		ow('user@[192.168.1.1]', ow.string.email);
	});

	// IPv6 address literal
	t.notThrows(() => {
		ow('user@[IPv6:2001:db8::1]', ow.string.email);
	});

	// Invalid IPv4 address literal
	t.throws(() => {
		ow('user@[256.256.256.256]', ow.string.email);
	}, {message: /Expected string to be an email address/});
});

test('string.email - quoted strings', t => {
	// Valid quoted strings
	t.notThrows(() => {
		ow('"john.doe"@example.com', ow.string.email);
	});

	t.notThrows(() => {
		ow('"john doe"@example.com', ow.string.email);
	});

	t.notThrows(() => {
		ow('"john@doe"@example.com', ow.string.email);
	});

	// Invalid quoted strings
	t.throws(() => {
		ow('"john.doe@example.com', ow.string.email);
	}, {message: /Expected string to be an email address/});

	t.throws(() => {
		ow('john.doe"@example.com', ow.string.email);
	}, {message: /Expected string to be an email address/});
});

test('string.email - special characters', t => {
	// Valid special characters in local part
	const validSpecialChars = [
		'user+tag@example.com',
		'user-name@example.com',
		'user_name@example.com',
		'user.name@example.com',
		'user!name@example.com',
		'user#name@example.com',
		'user$name@example.com',
		'user%name@example.com',
		'user&name@example.com',
		'user*name@example.com',
		'user/name@example.com',
		'user=name@example.com',
		'user?name@example.com',
		'user^name@example.com',
		'user`name@example.com',
		'user{name}@example.com',
		'user|name@example.com',
		'user~name@example.com',
	];

	for (const email of validSpecialChars) {
		t.notThrows(() => {
			ow(email, ow.string.email);
		});
	}
});

test('string.email - international domains', t => {
	// These should work with ASCII TLDs
	t.notThrows(() => {
		ow('test@example.com', ow.string.email);
	});

	t.notThrows(() => {
		ow('test@example.co.uk', ow.string.email);
	});

	t.notThrows(() => {
		ow('test@example.museum', ow.string.email);
	});

	t.notThrows(() => {
		ow('test@example.travel', ow.string.email);
	});
});

test('string.email - combined with other validators', t => {
	const emailValidator = ow.string.email.minLength(10);

	t.notThrows(() => {
		ow('test@example.com', emailValidator);
	});

	t.throws(() => {
		ow('a@b.co', emailValidator);
	}, {message: /Expected string to have a minimum length of `10`/});

	t.throws(() => {
		ow('invalid', emailValidator);
	}, {message: /Expected string to be an email address/});
});

test('string.email - with nullable and optional modifiers', t => {
	t.notThrows(() => {
		ow(null, ow.nullable.string.email);
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.string.email);
	});

	t.notThrows(() => {
		ow('test@example.com', ow.nullable.string.email);
	});

	t.throws(() => {
		ow('invalid', ow.nullable.string.email);
	}, {message: /Expected string to be an email address/});
});
