import test from 'ava';
import ow from '../source';

test('dataView', t => {
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView);
	});

	t.throws(() => {
		ow(new ArrayBuffer(1) as any, ow.dataView);
	}, {message: 'Expected argument to be of type `DataView` but received type `ArrayBuffer`'});

	t.throws(() => {
		ow(new ArrayBuffer(1) as any, 'data', ow.dataView);
	}, {message: 'Expected `data` to be of type `DataView` but received type `ArrayBuffer`'});

	t.throws(() => {
		ow(12 as any, ow.dataView);
	}, {message: 'Expected argument to be of type `DataView` but received type `number`'});
});

test('dataView.byteLength', t => {
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.byteLength(1));
	});

	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.byteLength(2));
	});

	t.throws(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.byteLength(2));
	}, {message: 'Expected DataView to have byte length of `2`, got `1`'});

	t.throws(() => {
		ow(new DataView(new ArrayBuffer(1)), 'foo', ow.dataView.byteLength(2));
	}, {message: 'Expected DataView `foo` to have byte length of `2`, got `1`'});
});

test('dataView.minByteLength', t => {
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.minByteLength(1));
	});

	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.minByteLength(1));
	});

	t.throws(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.minByteLength(2));
	}, {message: 'Expected DataView to have a minimum byte length of `2`, got `1`'});
});

test('dataView.maxByteLength', t => {
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.maxByteLength(1));
	});

	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.maxByteLength(4));
	});

	t.throws(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.maxByteLength(1));
	}, {message: 'Expected DataView to have a maximum byte length of `1`, got `2`'});
});
