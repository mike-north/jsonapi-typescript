// tslint:disable-next-line:no-namespace
declare namespace JSONAPI {
	namespace JSON {
		type Primitive = string | number | boolean | null;
		type Value = Primitive | Object | List;
		interface Object {
			[member: string]: Value;
		}
		interface List extends Array<Value> {}
	}

	/*
			A JSON object MUST be at the root of every JSON API request and response
			containing data. This object defines a document’s “top level”.

			A document MUST contain at least one of the following top-level members:
			*/

	type MetaObject = JSON.Object;
	interface DocWithMeta extends DocBase {
		meta: MetaObject; // a meta object that contains non-standard meta-information.
	}
	interface DocWithData extends DocBase {
		data: PrimaryData; // the document’s “primary data”
		included?: Included;
	}
	interface DocWithErrors extends DocBase {
		errors: Errors; // an array of error objects
	}
	// The members data and errors MUST NOT coexist in the same document.
	// ⛔️ NOT EXPRESSIBLE IN TYPESCRIPT
	// If a document does not contain a top-level data key,
	//    the included member MUST NOT be present either.
	// ⛔️ NOT EXPRESSIBLE IN TYPESCRIPT

	/* A document MAY contain any of these top-level members: */
	interface DocBase {
		jsonapi?: ImplementationInfo;
		links?: Links | PaginationLinks;
	}

	type Document = DocWithErrors | DocWithMeta | DocWithData;

	// an object describing the server’s implementation
	interface ImplementationInfo {
		version?: string;
		meta?: MetaObject;
	}

	type Link = string | { href: string; meta?: MetaObject };

	// The top-level links object MAY contain the following members:
	interface Links {
		self?: Link; // the link that generated the current response document.
		related?: Link; // a related resource link when the primary data represents a resource relationship.
		// TODO pagination links for the primary data.
	}
	interface PaginationLinks {
		first?: Link | null; // the first page of data
		last?: Link | null; // the last page of data
		prev?: Link | null; // the previous page of data
		next?: Link | null; // the next page of data
	}
	type Included = ResourceObject[];

	interface ErrorObject {
		id?: number | string;
		links?: Links;
		status?: string;
		code?: string;
		title?: string;
		detail?: string;
		source?: {
			pointer?: any;
			parameter?: string;
		};
		meta?: MetaObject;
	}

	type PrimaryData = SinglePrimaryData | CollectionPrimaryData;
	type SinglePrimaryData = null | ResourceObject | ResourceIdentifierObject;
	type CollectionPrimaryData =
		| never[]
		| ResourceObject[]
		| ResourceIdentifierObject[];
	interface ResourceObject {
		id?: string;
		type: string;
		attributes?: AttributesObject;
		relationships?: RelationshipsObject;
		links?: Links;
		meta?: MetaObject;
	}
	interface ResourceIdentifierObject {
		id: string;
		type: string;
		meta?: MetaObject;
	}
	type ResourceLinkage = null | never[] | ResourceIdentifierObject;
	namespace Relationships {
		interface WithLinks {
			links: Links;
		}
		interface WithData {
			data: ResourceLinkage;
		}
		interface WithMeta {
			meta: MetaObject;
		}
	}
	type RelationshipObject =
		| Relationships.WithData
		| Relationships.WithLinks
		| Relationships.WithMeta;
	interface RelationshipsObject {
		[k: string]: RelationshipObject;
	}

	interface AttributesObject {
		[k: string]: JSON.Value;
	}
	type Errors = ErrorObject[];
}
