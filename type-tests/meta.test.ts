import * as JSONAPI from '..';

// Array case
let d1: JSONAPI.DocWithData = {
	data: [
		{
			type: 'foo'
		}
	],
	meta: {
		foo: 'bar'
	}
};
// Object case
d1 = {
	data: {
		type: 'foo'
	},
	meta: {
		foo: 'bar'
	}
};

// Document only with MetaData
const d: JSONAPI.DocBase = {
	meta: {
		foo: 'bar'
	}
};
