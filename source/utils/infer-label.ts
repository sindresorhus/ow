import * as fs from 'fs';
import {CallSite} from 'callsites';
import isValidIdentifier from './is-valid-identifier';
import isNode from './node/is-node';

// Regex to extract the label out of the `ow` function call
const labelRegex = /^.*?\((?<label>.*?)[,)]/;

/**
Infer the label of the caller.

@hidden

@param callsites - List of stack frames.
*/
export const inferLabel = (callsites: readonly CallSite[]) => {
	if (!isNode) {
		// Exit if we are not running in a Node.js environment
		return;
	}

	// Grab the stackframe with the `ow` function call
	const functionCallStackFrame = callsites[1];

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

	if (!match?.groups?.label) {
		// Exit if we didn't find a label
		return;
	}

	const token = match.groups.label;

	if (isValidIdentifier(token) || isValidIdentifier(token.split('.').pop())) {
		return token;
	}

	return;
};
