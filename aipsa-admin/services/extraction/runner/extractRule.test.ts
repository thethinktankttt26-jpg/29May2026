import * as cheerio from "cheerio";

import {
  ExtractionRule,
} from "../contracts/extractionConfigV1";

import {
  extractRule,
} from "./extractRule";

function assertEqual(
  name: string,
  actual: unknown,
  expected: unknown
) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${name} FAILED: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
    );
  }

  console.log(`${name}: PASS`);
}

const html = `
<html>
<head>
  <meta property="og:image" content="https://example.com/product.jpg">

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "JSON-LD Product Name",
      "sku": "369510",
      "offers": {
        "price": "8.00",
        "priceCurrency": "GBP"
      }
    }
  </script>
</head>

<body>
  <h1 class="product-name">
    Next Essential T-Shirt
  </h1>

  <div class="price">£8.00</div>

  <select class="sizes">
    <option> S </option>
    <option> M </option>
    <option> S </option>
  </select>
</body>
</html>
`;

const $ = cheerio.load(html);

function runRule(
  rule: ExtractionRule
) {
  return extractRule($, rule);
}

const cssTextResult = runRule({
  source: "CSS",
  selectors: [
    {
      selector: ".product-name",
    },
  ],
  multiple: false,
  transforms: ["NORMALIZE_WHITESPACE"],
  required: true,
});

assertEqual(
  "CSS TEXT",
  cssTextResult.value,
  "Next Essential T-Shirt"
);

const attributeResult = runRule({
  source: "META",
  selectors: [
    {
      selector: 'meta[property="og:image"]',
      attribute: "content",
    },
  ],
  multiple: false,
  transforms: ["TRIM"],
  required: true,
});

assertEqual(
  "ATTRIBUTE EXTRACTION",
  attributeResult.value,
  "https://example.com/product.jpg"
);

const fallbackResult = runRule({
  source: "CSS",
  selectors: [
    {
      selector: ".missing-product-name",
    },
    {
      selector: ".product-name",
    },
  ],
  multiple: false,
  transforms: ["NORMALIZE_WHITESPACE"],
  required: true,
});

assertEqual(
  "ORDERED FALLBACK",
  fallbackResult.matchedSelector,
  ".product-name"
);

const multipleResult = runRule({
  source: "CSS",
  selectors: [
    {
      selector: ".sizes option",
    },
  ],
  multiple: true,
  transforms: ["TRIM", "DEDUPLICATE"],
  required: true,
});

assertEqual(
  "MULTIPLE VALUES",
  multipleResult.value,
  ["S", "M"]
);

const jsonLdResult = runRule({
  source: "JSON_LD",
  selectors: [
    {
      selector: "offers.price",
    },
  ],
  multiple: false,
  transforms: ["PARSE_PRICE"],
  required: true,
});

assertEqual(
  "JSON-LD",
  jsonLdResult.value,
  "8.00"
);

const requiredFailureResult = runRule({
  source: "CSS",
  selectors: [
    {
      selector: ".missing-required-field",
    },
  ],
  multiple: false,
  transforms: ["TRIM"],
  required: true,
});

assertEqual(
  "REQUIRED FAILURE SUCCESS FLAG",
  requiredFailureResult.success,
  false
);

assertEqual(
  "REQUIRED FAILURE ERROR",
  requiredFailureResult.error,
  "Required field could not be extracted."
);

const optionalMissingResult = runRule({
  source: "CSS",
  selectors: [
    {
      selector: ".missing-optional-field",
    },
  ],
  multiple: false,
  transforms: ["TRIM"],
  required: false,
});

assertEqual(
  "OPTIONAL MISSING SUCCESS FLAG",
  optionalMissingResult.success,
  true
);

assertEqual(
  "OPTIONAL MISSING VALUE",
  optionalMissingResult.value,
  null
);

console.log("ALL EXTRACT RULE TESTS PASSED");
