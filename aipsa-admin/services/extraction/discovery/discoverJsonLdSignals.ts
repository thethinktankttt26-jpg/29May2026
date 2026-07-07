import {
  discoverJsonLdDocuments,
} from "./discoverJsonLdDocuments";
import * as cheerio from "cheerio";

import {
  DiscoverySignal,
} from "./signalDiscoveryTypes";

type CheerioRoot = ReturnType<typeof cheerio.load>;

function flattenObject(
  value: unknown,
  prefix = "",
  output: DiscoverySignal[] = [],
  jsonLdDocumentType?: string
): DiscoverySignal[] {

  if (
    value === null ||
    value === undefined
  ) {
    return output;
  }

  if (
    typeof value !== "object"
  ) {
  output.push({
  source: "JSON_LD",
  path: prefix,
  value: String(value),
  confidence: 100,
  jsonLdDocumentType,
});

    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
     flattenObject(
    item,
    `${prefix}[${index}]`,
    output,
    jsonLdDocumentType
)
    );

    return output;
  }

  for (const [key, child] of Object.entries(value)) {
    const nextPath =
      prefix.length === 0
        ? key
        : `${prefix}.${key}`;

    flattenObject(
    child,
    nextPath,
    output,
    jsonLdDocumentType
);
  }

  return output;
}

export function discoverJsonLdSignals(
  html: string
): DiscoverySignal[] {

const signals: DiscoverySignal[] = [];

const discovery =
  discoverJsonLdDocuments(html);

for (const document of discovery.documents) {

  flattenObject(
    document.rawDocument,
    "",
    signals,
    document.documentType
  );

}

return signals;

}