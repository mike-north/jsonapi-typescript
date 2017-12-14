import { suite, test, slow, timeout } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows, assertTsNoThrows } from './helpers';

@suite('Top-Level Document Tests')
class TopLevelDocument {
	@test(
		'A JSON object MUST be at the root of every JSON API request and response containing data. This object defines a document’s “top level”'
	)
	primitiveValuesAreNotDocuments() {
		// Test the 5 JavaScript value types other than Object
		let expectedFailingCases = ['examples/only-string.ts', 'examples/only-boolean.ts', 'examples/only-number.ts'];
		expectedFailingCases.forEach(fileName => {
			assertTsThrows(fileName, /is not assignable to type 'Document'/, `${fileName} should have TS errors`);
		});
		let expectedPassingCases = ['examples/empty-errors.ts'];

		expectedPassingCases.forEach(fileName => {
			assertTsNoThrows(fileName, `${fileName} should have no TS errors`);
		});
	}
}
