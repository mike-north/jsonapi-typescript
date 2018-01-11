import { suite, test, slow, timeout, only } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import JSONAPI from '../../index';

@suite('Error Tests')
class ErrorTests {
	@test('empty object is not a valid error')
	async arbitraryObject() {
		await assertTsThrows(
			join(__dirname, 'examples/arbitrary-object.ts'),
			/is not assignable to type 'ErrorObject'/
		);
	}

	@test('Some valid errors')
	validErrors() {
		let e: JSONAPI.ErrorObject;
		e = {
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
	}
}
