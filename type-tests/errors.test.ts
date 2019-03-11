import * as JSONAPI from '..';

const a: JSONAPI.ErrorObject = {
	status: '500',
	title: 'Server Error',
	detail: 'Boom!',
	links: {
		related: 'https://reactjs.com'
	},
	meta: {
		dbquery: 'SELECT * FROM infinite_table'
	}
};

const b: JSONAPI.ErrorObject = {
	foo: 'bar' // $ExpectError
};
