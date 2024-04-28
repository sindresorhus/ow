import fs from 'node:fs';
import type {CallSite} from 'callsites';
import {isNode} from 'environment';
import isIdentifier from 'is-identifier';

// Regex to extract the label out of the `ow` function call
const labelRegex = /^.*?\((?<label>.*?)[,)]/;

/**
Infer the label of the caller.

@hidden

@param callsites - List of stack frames.
*/
export const inferLabel = (callsites: readonly CallSite[]): void | string => {
	if (!isNode) {
		// Exit if we are not running in a Node.js environment
		return;
	}

	// Grab the stackframe with the `ow` function call
	const functionCallStackFrame = callsites[1];
	if (!functionCallStackFrame) {
		return;
	}

	const fileName = functionCallStackFrame.getFileName();
	const lineNumber = functionCallStackFrame.getLineNumber();
	const columnNumber = functionCallStackFrame.getColumnNumber();

	if (fileName === null || lineNumber === null || columnNumber === null) {
		return;
	}

	let content: string[] = [];

	try {
		content = fs.readFileSync(fileName, 'utf8').split('\n');
	} catch {
		return;
	}

	let line = content[lineNumber - 1];

	if (!line) {
		// Exit if the line number couldn't be found
		return;
	}

	line = line.slice(columnNumber - 1);

	const match = labelRegex.exec(line);
	const token = match?.groups?.['label'];

	if (!token) {
		// Exit if we didn't find a label
		return;
	}

	// @ts-expect-error - Doesn't seem like something I can work around.
	if (isIdentifier(token) || isIdentifier(token.split('.').pop() ?? '')) { // eslint-disable-line @typescript-eslint/no-unsafe-call
		return token;
	}

	return;
};
