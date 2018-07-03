import { SingleResourceDoc } from '../../../index';

let d: SingleResourceDoc<
	'book',
	{ title: string; author: string; chapters: number }
>;
d = {
	data: {
		type: 'book',
		attributes: {
			title: 'Great Expectations',
			chapters: '12',
			author: 'F. Scott Fitzgerald'
		}
	}
};
