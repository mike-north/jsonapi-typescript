import * as JSONAPI from '..';

// single resource case
const d: JSONAPI.DocWithData<JSONAPI.ResourceObject[]> = {
	data: [
		{
			type: 'foo'
		}
	]
};

// With attributges
const e: JSONAPI.CollectionResourceDoc<'book'> = {
	data: [
		{
			type: 'book',
			attributes: {
				foo: 'Great Expectations',
				bar: 12,
				baz: 'F. Scott Fitzgerald'
			}
		}
	]
};

// specific type w/ specific attributes
const f: JSONAPI.CollectionResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
> = {
	data: [
		{
			type: 'book',
			attributes: {
				title: 'Great Expectations',
				chapters: 12,
				author: 'F. Scott Fitzgerald'
			}
		}
	]
};

function badDoc1(
	x: JSONAPI.CollectionResourceDoc<
		'book',
		{ title: string; author: string; chapters: number }
	>
) {}
const y = {
	data: [
		{
			type: 'book',
			attributes: {
				title: 'Great Expectations',
				chapters: '12',
				author: 'F. Scott Fitzgerald'
			}
		}
	]
};
badDoc1(y); // $ExpectError

const badDoc2: JSONAPI.CollectionResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
> = {
	data: [
		{
			type: 'book',
			attributes: {
				foo: 'Great Expectations', // $ExpectError
				bar: 12,
				baz: 'F. Scott Fitzgerald'
			}
		}
	]
};

function badDoc3(x: JSONAPI.CollectionResourceDoc<'book'>) {}
const val = {
	data: [
		{
			type: 'music',
			attributes: {
				foo: 'Great Expectations',
				bar: 12,
				baz: 'F. Scott Fitzgerald'
			}
		}
	]
};
badDoc3(val); // $ExpectError
