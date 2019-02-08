import test from 'ava';
import ow from '../source';

test('date', t => {
	t.notThrows(() => {
		ow(new Date(), ow.date);
	});

	t.throws(() => {
		ow('12' as any, ow.date);
	}, 'Expected argument to be of type `date` but received type `string`');

	t.throws(() => {
		ow('12' as any, 'foo', ow.date);
	}, 'Expected `foo` to be of type `date` but received type `string`');
});

test('date.before', t => {
	t.notThrows(() => {
		ow(new Date('2017-11-25'), ow.date.before(new Date('2017-11-26')));
	});

	t.notThrows(() => {
		ow(new Date('2017-11-25T12:00:00Z'), ow.date.before(new Date('2017-11-25T12:00:01Z')));
	});

	t.throws(() => {
		ow(new Date('2017-11-25T12:00:00Z') as any, ow.date.before(new Date('2017-11-25T12:00:00Z')));
	}, 'Expected date 2017-11-25T12:00:00.000Z to be before 2017-11-25T12:00:00.000Z');

	t.throws(() => {
		ow(new Date('2017-11-25T12:00:00Z') as any, 'foo', ow.date.before(new Date('2017-11-25T12:00:00Z')));
	}, 'Expected date `foo` 2017-11-25T12:00:00.000Z to be before 2017-11-25T12:00:00.000Z');
});

test('date.after', t => {
	t.notThrows(() => {
		ow(new Date('2017-11-26'), ow.date.after(new Date('2017-11-25')));
	});

	t.notThrows(() => {
		ow(new Date('2017-11-26T12:00:00Z'), ow.date.after(new Date('2017-11-26T11:59:59Z')));
	});

	t.throws(() => {
		ow(new Date('2017-11-26T12:00:00Z') as any, ow.date.after(new Date('2017-11-26T12:00:00Z')));
	}, 'Expected date 2017-11-26T12:00:00.000Z to be after 2017-11-26T12:00:00.000Z');
});
