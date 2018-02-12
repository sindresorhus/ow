export interface CollectionLike<T> {
	has(item: T): boolean;
}

/**
 * Retrieve the missing values in a collection based on an array of items.
 *
 * @hidden
 * @param source Source collection to search through.
 * @param items Items to search for.
 * @param maxValues Maximum number of values after the search process is stopped. (Default: 5)
 */
export default (source: CollectionLike<any>, items: any[], maxValues = 5) => {
	const missingValues: any[] = [];

	for (const value of items) {
		if (source.has(value)) {
			continue;
		}

		missingValues.push(value);

		if (missingValues.length === maxValues) {
			return missingValues;
		}
	}

	return missingValues.length === 0 ? true : missingValues;
};
