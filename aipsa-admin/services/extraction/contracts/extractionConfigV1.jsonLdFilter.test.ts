import {
  ExtractionRule,
} from "./extractionConfigV1";

const productGroupRule: ExtractionRule = {
  source: "JSON_LD",

  jsonLdFilter: {
    path: "@type",
    equals: "ProductGroup",
  },

  selectors: [
    {
      selector: "name",
    },
  ],

  multiple: false,
  transforms: ["TRIM"],
  required: true,
};

const productVariantsRule: ExtractionRule = {
  source: "JSON_LD",

  jsonLdFilter: {
    path: "@type",
    equals: "Product",
  },

  selectors: [
    {
      selector: "size",
    },
  ],

  multiple: true,
  transforms: [
    "TRIM",
    "DEDUPLICATE",
  ],
  required: true,
};

console.log(
  productGroupRule.jsonLdFilter?.equals
);

console.log(
  productVariantsRule.jsonLdFilter?.equals
);
