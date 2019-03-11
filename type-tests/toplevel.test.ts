import * as JSONAPI from '..';

let doc: JSONAPI.Document;
// Only errors
doc = { errors: [] };
// Only data
doc = {
	data: {
		type: 'articles',
		id: '1'
	}
};
// Only meta
doc = { meta: { something: { nested: 'here ' } } };
// Optional links and included
doc = {
	data: [],
	links: {
		related: {
			href: 'http://example.com/articles/1/comments',
			meta: {
				count: 10
			}
		}
	}
};
// Add optional ImplementationInfo
doc = { errors: [], jsonapi: {} };
// ImplementationInfo.Version and ImplementationInfo.Meta are Optional
doc = { errors: [], jsonapi: { version: '0.2' } };
// Free-for all (JSON) in meta
doc = { errors: [], jsonapi: { meta: { something: 'here ' } } };
doc = { errors: [], jsonapi: { meta: { something: { nested: 'here ' } } } };

doc = {
	data: [
		{
			type: 'articles',
			id: '1',
			attributes: {
				title: 'JSON API paints my bikeshed!'
			},
			links: {
				self: 'http://example.com/articles/1'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				},
				comments: {
					links: {
						self: 'http://example.com/articles/1/relationships/comments',
						related: 'http://example.com/articles/1/comments'
					},
					data: [{ type: 'comments', id: '5' }, { type: 'comments', id: '12' }]
				}
			}
		}
	],
	included: [
		{
			type: 'people',
			id: '9',
			attributes: {
				'first-name': 'Dan',
				'last-name': 'Gebhardt',
				twitter: 'dgeb'
			},
			links: {
				self: 'http://example.com/people/9'
			}
		},
		{
			type: 'comments',
			id: '5',
			attributes: {
				body: 'First!'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '2' }
				}
			},
			links: {
				self: 'http://example.com/comments/5'
			}
		},
		{
			type: 'comments',
			id: '12',
			attributes: {
				body: 'I like XML better'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/comments/12'
			}
		}
	]
};

// Array case
let doc2: JSONAPI.DocWithData = {
	data: [
		{
			type: 'foo'
		}
	]
};
// Object case
doc2 = {
	data: {
		type: 'foo'
	}
};

const badDoc1: JSONAPI.DocWithData<JSONAPI.ResourceObject[]> = {
	data: {
		type: 'foo' // $ExpectError
	}
};

const badDoc2 = {
	jsonapi: { meta: '5' },
	errors: [] as JSONAPI.Errors
};
function badDoc2Test(x: JSONAPI.Document) {}
badDoc2Test(badDoc2); // $ExpectError

const badDoc3 = {
	data: [
		{
			type: 'foo'
		}
	]
};
function badDoc3Test(x: JSONAPI.DocWithData<JSONAPI.ResourceObject>) {}
badDoc3Test(badDoc3); // $ExpectError

const badDoc4: JSONAPI.Document = true; // $ExpectError
// $ExpectError
const badDoc5: JSONAPI.Document = {
	jsonapi: { version: '1.0' }
};
const badDoc6: JSONAPI.Document = 'abc'; // $ExpectError
const badDoc7: JSONAPI.Document = 4; // $ExpectError
