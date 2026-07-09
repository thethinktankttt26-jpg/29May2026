export interface RuntimeContext {

  html: string;

  jsonLdDocuments: unknown[];

  metaTags: Map<
    string,
    string
  >;

  dom: unknown;

}