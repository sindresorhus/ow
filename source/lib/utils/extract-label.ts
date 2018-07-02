import * as fs from 'fs';
import isValidIdentifier from 'is-valid-identifier';

const regex = /^.*?\((.*?),/;

export const extractLabel = (callsites: any[]) => {
	// TODO exit if we are not running in node
	const callsite = callsites[1];

	const content = fs.readFileSync(callsite.getFileName(), 'utf8').split('\n');

	let line = content[callsite.getLineNumber() - 1];

	if (line) {
		line = line.slice(callsite.getColumnNumber() - 1);
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
