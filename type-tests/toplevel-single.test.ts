import * as JSONAPI from '..';

const d: JSONAPI.DocWithData<JSONAPI.ResourceObject> = {
	data: {
		type: 'foo'
	}
};

const e: JSONAPI.SingleResourceDoc<'book'> = {
	data: {
		type: 'book',
		attributes: {
			foo: 'Great Expectations',
			bar: 12,
			baz: 'F. Scott Fitzgerald'
		}
	}
};

const f: JSONAPI.SingleResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
> = {
	data: {
		type: 'book',
		attributes: {
			title: 'Great Expectations',
			author: 'F. Scott Fitzgerald',
			chapters: 12
		}
	}
};

interface OptionalAttributes extends JSONAPI.AttributesObject {
	title: string;
	author?: string;
	chapters: number
}

function optionalFunc(
optionalAttributes: OptionalAttributes
): JSONAPI.SingleResourceDoc<
'book', OptionalAttributes
> {
	return {
		data: {
			type: 'book',
			attributes: {
				title: optionalAttributes.title,
				author: optionalAttributes.author,
				chapters: optionalAttributes.chapters
			}
		}
	}
}
optionalFunc({title: 'Great Expectations', chapters:12})

const g = {
	data: {
		type: 'book',
		attributes: {
			title: 'Great Expectations',
			chapters: '12',
			author: 'F. Scott Fitzgerald'
		}
	}
};
function gFunc(
	g: JSONAPI.SingleResourceDoc<
		'book',
		{ title: string; author: string; chapters: number }
	>
) {}
gFunc(g); // $ExpectError

const h: JSONAPI.SingleResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
> = {
	data: {
		type: 'book',
		attributes: {
			foo: 'Great Expectations', // $ExpectError
			bar: 12,
			baz: 'F. Scott Fitzgerald'
		}
	}
};

const i = {
	data: {
		type: 'music',
		attributes: {
			foo: 'Great Expectations',
			bar: 12,
			baz: 'F. Scott Fitzgerald'
		}
	}
};
function iFunc(x: JSONAPI.SingleResourceDoc<'book'>) {}
iFunc(i); // $ExpectError
