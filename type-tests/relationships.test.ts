import * as JSONAPI from '..';

const a: JSONAPI.RelationshipObject = {
	links: {
		self: 'http://example.com/articles/1/relationships/author',
		related: {
			href: 'http://example.com/articles/1/author',
			meta: { key: 'val' }
		}
	},
	meta: { key: 'value' },
	data: { type: 'people', id: '9' }
};

// $ExpectError
const b: JSONAPI.RelationshipObject = {};
