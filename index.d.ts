declare namespace JSONAPI {
  interface Info { version?: string; meta?: any }
  interface Err {} // TODO
  interface PrimaryData{} // TODO
  interface DocBase {
    jsonapi?: Info
  }
  interface DocWithData extends DocBase {
    data: PrimaryData;
  }
  interface DocWithErrors extends DocBase {
    errors: Err[]
  }
	type Document = DocWithData | DocWithErrors;
}
