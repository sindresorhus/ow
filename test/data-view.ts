import test from 'ava';
import ow from '../source';

test('dataView', t => {
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView);
	});

	t.throws(() => {
		ow(new ArrayBuffer(1) as any, ow.dataView);
	}, 'Expected argument to be of type `DataView` but received type `ArrayBuffer`');

	t.throws(() => {
		ow(new ArrayBuffer(1) as any, 'data', ow.dataView);
	}, 'Expected `data` to be of type `DataView` but received type `ArrayBuffer`');

	t.throws(() => {
		ow(12 as any, ow.dataView);
	}, 'Expected argument to be of type `DataView` but received type `number`');
});
