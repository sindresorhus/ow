import * as fs from 'fs';
import {CallSite} from 'callsites';
import * as isNode from 'is-node';
import isValidIdentifier from 'is-valid-identifier';

const regex = /^.*?\((.*?)[,)]/;

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

	const fileName = callsites[1].getFileName();
	const lineNumber = callsites[1].getLineNumber();
	const columnNumber = callsites[1].getColumnNumber();

	if (!fileName || lineNumber === null || columnNumber === null) {
		return;
	}

	const content = fs.readFileSync(fileName, 'utf8').split('\n');

	let line = content[lineNumber - 1];

	if (line) {
		line = line.slice(columnNumber - 1);

		const match = regex.exec(line);

		if (match && match[1]) {
			const token = match[1];

			if (isValidIdentifier(token) || isValidIdentifier(token.split('.').pop())) {
				return token;
			}
		}
	}

	return;
};
