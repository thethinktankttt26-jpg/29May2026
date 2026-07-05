import { readFile } from "fs/promises";
import * as cheerio from "cheerio";

import {
  ExtractionRule,
} from "../contracts/extractionConfigV1";

import {
  extractRule,
} from "./extractRule";

async function runTest() {
  const html = await readFile(
    "services/extraction/acquisition/fixtures/next-product-st056123.html",
    "utf8"
  );

  const $ = cheerio.load(html);

  const productGroupNameRule: ExtractionRule = {
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

  const productGroupResult = extractRule(
    $,
    productGroupNameRule
  );

  console.log(
    "PRODUCT GROUP NAME:",
    productGroupResult.value
  );

  if (
    productGroupResult.value !==
    "Essential Crew Neck Cotton T-Shirt"
  ) {
    throw new Error(
      "ProductGroup filtering failed."
    );
  }

  const productSizesRule: ExtractionRule = {
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

  const productSizesResult = extractRule(
    $,
    productSizesRule
  );

  console.log(
    "SIZE COUNT:",
    Array.isArray(productSizesResult.value)
      ? productSizesResult.value.length
      : 0
  );

  console.log(
    "SIZES:",
    productSizesResult.value
  );

  if (
    !Array.isArray(productSizesResult.value) ||
    productSizesResult.value.length !== 23
  ) {
    throw new Error(
      "Expected exactly 23 Product variant sizes."
    );
  }

  if (
    !productSizesResult.value.includes("XS Short") ||
    !productSizesResult.value.includes("5XL Reg") ||
    !productSizesResult.value.includes("4XL Tall")
  ) {
    throw new Error(
      "Expected representative Next sizes were not extracted."
    );
  }

  console.log(
    "ALL JSON-LD FILTER RUNTIME TESTS PASSED"
  );
}

runTest();
