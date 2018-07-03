import { suite, test } from 'mocha-typescript';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import { DocWithData, ResourceObject, CollectionResourceDoc } from '../..';

@suite(
	'CollectionResourceDoc Tests: Top-level documents that should contain collections of resource objects.'
)
class CollectionResourceDocTests {
	@test('Document with multi resource data')
	validDocWithCollectionResourceData() {
		// single resource case
		let d: DocWithData<ResourceObject[]> = {
			data: [
				{
					type: 'foo'
				}
			]
		};
	}

	@test(
		'DocWithData<ResourceObject[]> will throw type error on a single-resource document'
	)
	async invalidDocWithCollectionResourceData() {
		await assertTsThrows(
			join(__dirname, 'examples/bad-collection-doc.ts'),
			/is not assignable to type 'DocWithData<ResourceObject</,
			'Doc that should contain a collection throws if data: is an object'
		);
	}

	@test('CollectionResourceDoc for specific type w/o specific attributes')
	async validCollectionResourceDocWithTypeName() {
		let d: CollectionResourceDoc<'book'>;
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
	}

	@test('CollectionResourceDoc for specific type w/ specific attributes')
	async validCollectionResourceDocWithAttrs() {
		let d: CollectionResourceDoc<
			'book',
			{ title: string; author: string; chapters: number }
		>;
		d = {
			data: [
				{
					type: 'book',
					attributes: {
						title: 'Great Expectations',
						chapters: 12,
						author: 'F. Scott Fitzgerald'
					}
				}
			]
		};
	}

	@test(
		'CollectionResourceDoc that specifies resource type name should throw in the presence of resources w/ mis-matching type names'
	)
	async invalidCollectionResourceDocTypename() {
		await assertTsThrows(
			join(__dirname, 'examples/collection-resource-wrong-typename.ts'),
			/Type '"music"' is not assignable to type '"book"'/,
			'If a type CollectionResourceDoc specifies a type name, resource objects with mis-matching type name will cause type errors'
		);
	}

	@test(
		'CollectionResourceDoc that specifies resource attributes should throw in the presence of resources w/ mis-matching attribute names'
	)
	async invalidCollectionResourceDocAttributeNames() {
		await assertTsThrows(
			join(__dirname, 'examples/collection-resource-wrong-attributes.ts'),
			/'foo' does not exist in type 'AttributesObject/,
			'If a type CollectionResourceDoc specifies attributes, resource objects with mis-matching attribute names will cause type errors'
		);
	}
	@test(
		'CollectionResourceDoc that specifies resource attributes should throw in the presence of resources w/ mis-matching attribute types'
	)
	async invalidCollectionResourceDocAttributeTypes() {
		await assertTsThrows(
			join(__dirname, 'examples/collection-resource-wrong-attribute-types.ts'),
			/Type 'string' is not assignable to type 'number'/,
			'If a type CollectionResourceDoc specifies attributes, resource objects with mis-matching attribute types will cause type errors'
		);
	}
}
