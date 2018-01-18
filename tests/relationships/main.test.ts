import { suite, test, slow, timeout, only } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import * as JSONAPI from '../../index';

@suite('Relationship objects')
class RelationshipsTests {
	@test('An empty object is not a resource')
	async emptyObject() {
		await assertTsThrows(
			join(__dirname, 'examples/empty-object.ts'),
			/is not assignable to type 'RelationshipObject'/,
			'string is not a valid relationship object'
		);
	}

	@test('A few examples of valid relationship objects')
	validObjects() {
		let o: JSONAPI.RelationshipObject;
		o = {
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
	}
}
