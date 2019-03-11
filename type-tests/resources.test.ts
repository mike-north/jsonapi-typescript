import * as JSONAPI from '..';

const a: JSONAPI.ResourceObject = {
	type: 'articles',
	id: '1',
	attributes: {
		title: 'Rails is Omakase'
	},
	relationships: {
		author: {
			links: {
				self: 'http://example.com/articles/1/relationships/author',
				related: 'http://example.com/articles/1/author'
			},
			data: { type: 'people', id: '9' }
		}
	},
	links: {
		self: 'http://example.com/articles/1'
	},
	meta: {
		key: 'value'
	}
};

// $ExpectError
const b: JSONAPI.ResourceObject = {};

// $ExpectError
const c: JSONAPI.ResourceObject = {
	id: '41'
};
