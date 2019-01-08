import fs from './node/fs';
import {CallSite} from 'callsites';
import * as isNode from 'is-node';
import isValidIdentifier from 'is-valid-identifier';

// Regex to extract the label out of the `ow` function call
const labelRegex = /^.*?\((.*?)[,)]/;

/**
 * Infer the label of the caller.
 *
 * @param callsites - List of stack frames.
 */
export const inferLabel = (callsites: CallSite[]) => {
	if (!isNode) {
		// Exit if we are not running in a Node.js environment
		return;
	}

	// Grab the stackframe with the `ow` function call
	const functionCallStackFrame = callsites[1];

	const fileName = functionCallStackFrame.getFileName();
	const lineNumber = functionCallStackFrame.getLineNumber();
	const columnNumber = functionCallStackFrame.getColumnNumber();

	if (!fileName || lineNumber === null || columnNumber === null) {
		return;
	}

	const content = (fs.readFileSync(fileName, 'utf8') as string).split('\n');

	let line = content[lineNumber - 1];

	if (!line) {
		// Exit if the line number couldn't be found
		return;
	}

	line = line.slice(columnNumber - 1);

	const match = labelRegex.exec(line);

	if (!match || !match[1]) {
		// Exit if we didn't find a label
		return;
	}

	const token = match[1];

	if (isValidIdentifier(token) || isValidIdentifier(token.split('.').pop())) {
		return token;
	}

	return;
};
