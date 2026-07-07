import * as fs from "fs";

import { discoverJsonLdSignals } from "./discoverJsonLdSignals";

const html = fs.readFileSync(
  "services/extraction/acquisition/fixtures/next-product-st056123.html",
  "utf8"
);

const signals = discoverJsonLdSignals(html);

const interesting = signals.filter(
  signal =>
    signal.path === "name" ||
    signal.path === "offers.price" ||
    signal.path === "brand.name"
);

for (const signal of interesting) {
  console.log({
    path: signal.path,
    value: signal.value,
    documentType: signal.jsonLdDocumentType,
  });
}