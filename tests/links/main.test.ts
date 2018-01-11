import { suite, test, slow, timeout, only } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import JSONAPI from '../../index';

@suite('Link Tests')
class LinkTests {
	@test('empty object is not a valid Link')
	async emptyObject() {
		await assertTsThrows(
			join(__dirname, 'examples/empty-object.ts'),
			/is not assignable to type 'Link'/
		);
	}
	@test('A few examples of valid links')
	validLinks() {
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
	}
}
