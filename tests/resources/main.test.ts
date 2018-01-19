import { suite, test, slow, timeout, only } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import * as JSONAPI from '../../index';

@suite('Resource objects')
class ResourceTests {
	@test('An empty object is not a resource')
	async emptyObject() {
		await assertTsThrows(
			join(__dirname, 'examples/empty-object.ts'),
			/is not assignable to type 'ResourceObject'/,
			'string is not a valid resource object'
		);
	}

	@test('Resources must have a "type"')
	async hasType() {
		await assertTsThrows(
			join(__dirname, 'examples/missing-type.ts'),
			/is not assignable to type 'ResourceObject'/,
			'string is not a valid resource object'
		);
	}

	@test('A few examples of valid resource objects')
	validResourceObjects() {
		let o: JSONAPI.ResourceObject;
		o = {
			type: 'articles',
			id: '1',
			attributes: {
				title: 'Rails is Omakase'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/articles/1'
			},
			meta: {
				key: 'value'
			}
		};
	}
}
