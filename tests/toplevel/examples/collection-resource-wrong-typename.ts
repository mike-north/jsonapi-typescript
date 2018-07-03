import { CollectionResourceDoc } from '../../../index';

let d: CollectionResourceDoc<'book'>;
d = {
	data: [
		{
			type: 'music',
			attributes: {
				foo: 'Great Expectations',
				bar: 12,
				baz: 'F. Scott Fitzgerald'
			}
		}
	]
};
