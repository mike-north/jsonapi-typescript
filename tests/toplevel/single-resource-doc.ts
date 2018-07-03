import { suite, test } from 'mocha-typescript';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import { DocWithData, ResourceObject, SingleResourceDoc } from '../..';

@suite(
	'Single-Resource Document Tests: Tests for top-level docs that should contain a single resource.'
)
class SingleResourceDocTests {
	@test('Document with single resource data')
	validDocWithSingleResourceData() {
		// single resource case
		let d: DocWithData<ResourceObject> = {
			data: {
				type: 'foo'
			}
		};
	}

	@test(
		'DocWithData<SinglePrimaryData> will throw type error on a collection document'
	)
	async invalidDocWithSingleResourceData() {
		await assertTsThrows(
			join(__dirname, 'examples/bad-single-resource-doc.ts'),
			/is not assignable to type 'DocWithData<ResourceObject/,
			'Doc that should contain a single resource throws if data: is an array'
		);
	}

	@test('SingleResourceDoc for specific type w/o specific attributes')
	async validDocWithSpecificSingleResourceType() {
		let d: SingleResourceDoc<'book'>;
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
	}

	@test('SingleResourceDoc for specific type w/ specific attributes')
	async validDocWithSpecificTypeAndSingleResourceData() {
		let d: SingleResourceDoc<
			'book',
			{ title: string; author: string; chapters: number }
		>;
		d = {
			data: {
				type: 'book',
				attributes: {
					title: 'Great Expectations',
					chapters: 12,
					author: 'F. Scott Fitzgerald'
				}
			}
		};
	}

	@test(
		'SingleResourceDoc that specifies resource type name should throw in the presence of resources w/ mis-matching type names'
	)
	async invalidSingleResourceDocTypename() {
		await assertTsThrows(
			join(__dirname, 'examples/single-resource-wrong-typename.ts'),
			/Type '"music"' is not assignable to type '"book"'/,
			'If a type SingleResourceDoc specifies a type name, resource objects with mis-matching type name will cause type errors'
		);
	}

	@test(
		'SingleResourceDoc that specifies resource attributes should throw in the presence of resources w/ mis-matching attribute names'
	)
	async invalidSingleResourceAttributeNames() {
		await assertTsThrows(
			join(__dirname, 'examples/single-resource-wrong-attributes.ts'),
			/'foo' does not exist in type 'AttributesObject/,
			'If a type SingleResourceDoc specifies attributes, resource objects with mis-matching attribute names will cause type errors'
		);
	}
	@test(
		'SingleResourceDoc that specifies resource attributes should throw in the presence of resources w/ mis-matching attribute types'
	)
	async invalidSingleResourceAttributeTypes() {
		await assertTsThrows(
			join(__dirname, 'examples/single-resource-wrong-attribute-types.ts'),
			/Type 'string' is not assignable to type 'number'/,
			'If a type SingleResourceDoc specifies attributes, resource objects with mis-matching attribute types will cause type errors'
		);
	}
}
