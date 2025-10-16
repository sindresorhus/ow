import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import test from 'ava';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const distPath = join(currentDirectory, '../dist/index.js');

test('built dist/ files can be imported and work correctly', async t => {
	// This test ensures the dist/ folder is properly built
	// It catches issues like:
	// - Build failures that leave stale files
	// - Missing dependencies in compiled code
	// - Runtime errors in transpiled code

	// Dynamic import from dist/
	const owModule = await import(distPath);
	const ow = owModule.default;

	// Test basic functionality
	t.notThrows(() => {
		ow(1, ow.number);
	});

	t.throws(() => {
		ow('test', ow.number);
	});

	// Test ow.any() specifically (the bug in v3.1.0)
	t.true(ow.isValid(1, ow.any(ow.number, ow.string)));
	t.true(ow.isValid('test', ow.any(ow.number, ow.string)));
	t.false(ow.isValid(true, ow.any(ow.number, ow.string)));
	t.false(ow.isValid(null, ow.any(ow.number, ow.string)));
	t.false(ow.isValid(undefined, ow.any(ow.number, ow.string)));
});
