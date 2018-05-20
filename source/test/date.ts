import test from 'ava';
import m from '..';

test('date', t => {
	t.notThrows(() => m(new Date(), m.date));
	t.notThrows(() => m(new Date(), m.date.label('foo')));
	t.throws(() => m('12' as any, m.date), 'Expected argument to be of type `date` but received type `string`');
	t.throws(() => m('12' as any, m.date.label('foo')), 'Expected `foo` to be of type `date` but received type `string`');
});

test('date.before', t => {
	t.notThrows(() => m(new Date('2017-11-25'), m.date.before(new Date('2017-11-26'))));
	t.notThrows(() => m(new Date('2017-11-25T12:00:00Z'), m.date.before(new Date('2017-11-25T12:00:01Z'))));
	t.notThrows(() => m(new Date('2017-11-25T12:00:00Z'), m.date.label('foo').before(new Date('2017-11-25T12:00:01Z'))));
	t.notThrows(() => m(new Date('2017-11-25T12:00:00Z'), m.date.before(new Date('2017-11-25T12:00:01Z')).label('foo')));
	t.throws(() => m(new Date('2017-11-25T12:00:00Z') as any, m.date.before(new Date('2017-11-25T12:00:00Z'))), 'Expected date 2017-11-25T12:00:00.000Z to be before 2017-11-25T12:00:00.000Z');
	t.throws(() => m(new Date('2017-11-25T12:00:00Z') as any, m.date.label('foo').before(new Date('2017-11-25T12:00:00Z'))), 'Expected date `foo` 2017-11-25T12:00:00.000Z to be before 2017-11-25T12:00:00.000Z');
	t.throws(() => m(new Date('2017-11-25T12:00:00Z') as any, m.date.before(new Date('2017-11-25T12:00:00Z')).label('foo')), 'Expected date `foo` 2017-11-25T12:00:00.000Z to be before 2017-11-25T12:00:00.000Z');
});

test('date.after', t => {
	t.notThrows(() => m(new Date('2017-11-26'), m.date.after(new Date('2017-11-25'))));
	t.notThrows(() => m(new Date('2017-11-26T12:00:00Z'), m.date.after(new Date('2017-11-26T11:59:59Z'))));
	t.throws(() => m(new Date('2017-11-26T12:00:00Z') as any, m.date.after(new Date('2017-11-26T12:00:00Z'))), 'Expected date 2017-11-26T12:00:00.000Z to be after 2017-11-26T12:00:00.000Z');
});
