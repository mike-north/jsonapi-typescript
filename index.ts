import * as JSON from 'json-typescript';
/**
 * A JSON object MUST be at the root of every JSON API request and responsecontaining data.
 * This object defines a document’s “top level”.
 * A document MUST contain at least one of the following top-level members:
 */

export type MetaObject = JSON.Object;

/**
 * this type is no longer required, as the meta has been moved to the DocBase
 * this type can be safely removed in future versions
 */
export interface DocWithMeta extends DocBase {
	meta: MetaObject; // a meta object that contains non-standard meta-information.
}

export interface DocWithData<T extends PrimaryData = PrimaryData>
	extends DocBase {
	data: T; // the document’s “primary data”
	included?: Included;
}

export interface DocWithErrors extends DocBase {
	errors: Errors; // an array of error objects
}
// The members data and errors MUST NOT coexist in the same document.
// ⛔️ NOT EXPRESSIBLE IN TYPESCRIPT
// If a document does not contain a top-level data key,
//    the included member MUST NOT be present either.
// ⛔️ NOT EXPRESSIBLE IN TYPESCRIPT

/* A document MAY contain any of these top-level members: */
export interface DocBase {
	jsonapi?: ImplementationInfo;
	links?: Links | PaginationLinks;
	meta?: MetaObject; // a meta object that contains non-standard meta-information.
}

export type Document = DocWithErrors | DocWithMeta | DocWithData;
export type SingleResourceDoc<
	T extends string = string,
	A extends Attributes = Attributes
> = DocWithData<ResourceObject<T, A>>;
export type CollectionResourceDoc<
	T extends string = string,
	A extends Attributes = Attributes
> = DocWithData<Array<ResourceObject<T, A>>>;

// an object describing the server’s implementation
export interface ImplementationInfo {
	version?: string;
	meta?: MetaObject;
}

interface Attribute  {
	[k: string]: JSON.Value ;
}

type Attributes = Partial<Attribute>;

export type Link = string | { href: string; meta?: MetaObject };

// The top-level links object MAY contain the following members:
export interface Links {
	self?: Link; // the link that generated the current response document.
	related?: Link; // a related resource link when the primary data represents a resource relationship.
	// TODO pagination links for the primary data.
}

export interface PaginationLinks {
	first?: Link | null; // the first page of data
	last?: Link | null; // the last page of data
	prev?: Link | null; // the previous page of data
	next?: Link | null; // the next page of data
}

export type Included = ResourceObject[];

export interface ErrorObject {
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

export type PrimaryData<
	T extends string = string,
	A extends AttributesObject = AttributesObject
> = ResourceObject<T, A> | Array<ResourceObject<T, A>>;

export interface ResourceObject<
	T extends string = string,
	A extends AttributesObject = AttributesObject
> {
	id?: string;
	type: T;
	attributes?: AttributesObject<A>;
	relationships?: RelationshipsObject;
	links?: Links;
	meta?: MetaObject;
}

export interface ResourceIdentifierObject {
	id: string;
	type: string;
	meta?: MetaObject;
}

export type ResourceLinkage =
	| null
	| never[]
	| ResourceIdentifierObject
	| ResourceIdentifierObject[];

export interface RelationshipsWithLinks {
	links: Links;
}

export interface RelationshipsWithData {
	data: ResourceLinkage;
}

export interface RelationshipsWithMeta {
	meta: MetaObject;
}

export type RelationshipObject =
	| RelationshipsWithData
	| RelationshipsWithLinks
	| RelationshipsWithMeta;

export interface RelationshipsObject {
	[k: string]: RelationshipObject;
}

export type AttributesObject<
	ATTRS extends Attributes = Attributes
> = { [K in keyof ATTRS]: ATTRS[K] };

export type Errors = ErrorObject[];
