import * as cheerio from "cheerio";

import {
  JsonLdDiscoveryResult,
  JsonLdDocument,
} from "./jsonLdDocumentTypes";

export function discoverJsonLdDocuments(
  html: string
): JsonLdDiscoveryResult {

  const $ = cheerio.load(html);

  const documents: JsonLdDocument[] = [];

  let documentIndex = 0;

  $('script[type="application/ld+json"]').each(
    (_, element) => {

      const text = $(element).html();

      if (!text) {
        return;
      }

      try {

        const parsed = JSON.parse(text);

        const entries = Array.isArray(parsed)
          ? parsed
          : [parsed];

        for (const entry of entries) {

          documents.push({

            documentIndex,

            documentType:
              typeof entry?.["@type"] === "string"
                ? entry["@type"]
                : "UNKNOWN",

            rawDocument: entry,

          });

          documentIndex++;

        }

      } catch {

        // Ignore malformed JSON-LD

      }

    }
  );

  return {

    documents,

  };

}