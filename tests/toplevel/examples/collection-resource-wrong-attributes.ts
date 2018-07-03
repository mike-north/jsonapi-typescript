import { CollectionResourceDoc } from '../../../index';

let d: CollectionResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
>;
d = {
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
