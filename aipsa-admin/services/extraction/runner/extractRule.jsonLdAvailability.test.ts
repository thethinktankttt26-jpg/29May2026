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

  const availabilityRule: ExtractionRule = {
    source: "JSON_LD",

    jsonLdFilter: {
      path: "@type",
      equals: "Product",
    },

    selectors: [
      {
        selector: "offers.availability",
      },
    ],

    multiple: true,

    transforms: [
      "TRIM",
    ],

    required: true,
  };

  const result = extractRule(
    $,
    availabilityRule
  );

  console.log(
    "AVAILABILITY COUNT:",
    Array.isArray(result.value)
      ? result.value.length
      : 0
  );

  if (!Array.isArray(result.value)) {
    throw new Error(
      "Expected availability array."
    );
  }

  const soldOutCount =
    result.value.filter(
      (value) =>
        value ===
        "http://schema.org/SoldOut"
    ).length;

  const inStockCount =
    result.value.filter(
      (value) =>
        value ===
        "http://schema.org/InStock"
    ).length;

  console.log(
    "SOLD OUT COUNT:",
    soldOutCount
  );

  console.log(
    "IN STOCK COUNT:",
    inStockCount
  );

  if (result.value.length !== 23) {
    throw new Error(
      "Expected exactly 23 availability values."
    );
  }

  if (soldOutCount !== 6) {
    throw new Error(
      `Expected 6 SoldOut variants, received ${soldOutCount}.`
    );
  }

  if (inStockCount !== 17) {
    throw new Error(
      `Expected 17 InStock variants, received ${inStockCount}.`
    );
  }

  console.log(
    "JSON-LD VARIANT AVAILABILITY TEST PASSED"
  );
}

runTest();
