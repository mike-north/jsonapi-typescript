import { SingleResourceDoc } from '../../../index';

let d: SingleResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
>;
d = {
	data: {
		type: 'book',
		attributes: {
			foo: 'Great Expectations',
			bar: 12,
			baz: 'F. Scott Fitzgerald'
		}
	}
};
