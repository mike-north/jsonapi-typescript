import { SingleResourceDoc } from '../../../index';

let d: SingleResourceDoc<'book'>;
d = {
	data: {
		type: 'music',
		attributes: {
			foo: 'Great Expectations',
			bar: 12,
			baz: 'F. Scott Fitzgerald'
		}
	}
};
