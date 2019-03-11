import * as JSONAPI from '..';

let l: JSONAPI.Links;
// Self-linking
l = { self: 'url' };
// Related-linking
l = { related: 'url' };
// Object representation of link, with meta
l = {
	self: {
		href: 'url',
		meta: { key: 'value' }
	}
};

// $ExpectError
const o: JSONAPI.Link = {};
