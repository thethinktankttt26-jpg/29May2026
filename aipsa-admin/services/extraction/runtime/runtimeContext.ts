import {
  CheerioAPI,
} from "cheerio";

export interface RuntimeContext {

  html: string;

  jsonLdDocuments: unknown[];

  metaTags: Map<
    string,
    string
  >;

  dom: CheerioAPI;

}