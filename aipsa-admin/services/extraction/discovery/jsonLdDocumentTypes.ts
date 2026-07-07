export interface JsonLdDocument {

  documentIndex: number;

  documentType: string;

  rawDocument: unknown;

}

export interface JsonLdDiscoveryResult {

  documents: JsonLdDocument[];

}