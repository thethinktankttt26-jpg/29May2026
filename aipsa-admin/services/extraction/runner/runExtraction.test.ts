import { readFile } from "fs/promises";

import {
  EXTRACTION_CONFIG_CONTRACT_VERSION,
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

import {
  reduceProductPage,
} from "../reduction/reduceProductPage";

import {
  runExtraction,
} from "./runExtraction";

async function runTest() {
  const fixturePath =
    "services/extraction/acquisition/fixtures/controlled-product-sample.html";

  const html = await readFile(fixturePath, "utf-8");

  const reduced = reduceProductPage(html);

  const config: ExtractionConfigV1 = {
    contractVersion:
      EXTRACTION_CONFIG_CONTRACT_VERSION,

    configScope: {
      type: "CATEGORY",
      category: "Clothing",
    },

    fields: {
      productName: {
        source: "CSS",
        selectors: [
          { selector: ".missing-product-name" },
          { selector: ".product-name" },
        ],
        multiple: false,
        transforms: ["NORMALIZE_WHITESPACE"],
        required: true,
      },

      brand: {
        source: "CSS",
        selectors: [
          { selector: ".brand" },
        ],
        multiple: false,
        transforms: ["TRIM"],
        required: true,
      },

      productIdentifier: {
        source: "JSON_LD",
        selectors: [
          { selector: "sku" },
        ],
        multiple: false,
        transforms: ["TRIM"],
        required: true,
      },

      currentPrice: {
        source: "CSS",
        selectors: [
          { selector: ".current-price" },
        ],
        multiple: false,
        transforms: ["PARSE_PRICE"],
        required: true,
      },

      originalPrice: {
        source: "CSS",
        selectors: [
          { selector: ".original-price" },
        ],
        multiple: false,
        transforms: ["PARSE_PRICE"],
        required: false,
      },

      currency: {
        source: "JSON_LD",
        selectors: [
          { selector: "offers.priceCurrency" },
        ],
        multiple: false,
        transforms: ["PARSE_CURRENCY"],
        required: true,
      },

      primaryImage: {
        source: "META",
        selectors: [
          {
            selector: 'meta[property="og:image"]',
            attribute: "content",
          },
        ],
        multiple: false,
        transforms: ["NORMALIZE_URL"],
        required: true,
      },

      additionalImages: {
        source: "CSS",
        selectors: [
          {
            selector: ".additional-image",
            attribute: "src",
          },
        ],
        multiple: true,
        transforms: [
          "NORMALIZE_URL",
          "DEDUPLICATE",
        ],
        required: false,
      },

      sizes: {
        source: "CSS",
        selectors: [
          { selector: ".sizes option" },
        ],
        multiple: true,
        transforms: ["TRIM", "DEDUPLICATE"],
        required: true,
      },

      colours: {
        source: "CSS",
        selectors: [
          { selector: ".colour" },
        ],
        multiple: true,
        transforms: ["TRIM", "DEDUPLICATE"],
        required: true,
      },

      stockAvailability: {
        source: "CSS",
        selectors: [
          { selector: ".stock-status" },
        ],
        multiple: false,
        transforms: [
          "NORMALIZE_WHITESPACE",
        ],
        required: true,
      },
    },
  };

  const result = runExtraction(
    reduced.html,
    config
  );

  console.log("RUN SUCCESS:", result.success);
  console.log("ERRORS:", result.errors);

  for (
    const [fieldName, fieldResult]
    of Object.entries(result.fields)
  ) {
    console.log(
      fieldName,
      "=>",
      fieldResult.value,
      "| SUCCESS:",
      fieldResult.success,
      "| SELECTOR:",
      fieldResult.matchedSelector
    );
  }

  if (!result.success) {
    throw new Error(
      `Extraction run failed: ${result.errors.join(", ")}`
    );
  }

  if (
    result.fields.productName.value !==
    "White Regular Fit Essential Crew Neck T-Shirt"
  ) {
    throw new Error("Product name extraction failed.");
  }

  if (
    result.fields.productIdentifier.value !==
    "369510"
  ) {
    throw new Error(
      "Product identifier extraction failed."
    );
  }

  if (
    result.fields.currentPrice.value !== "8.00"
  ) {
    throw new Error("Price extraction failed.");
  }

  if (
    result.fields.currency.value !== "GBP"
  ) {
    throw new Error("Currency extraction failed.");
  }

  if (
    JSON.stringify(result.fields.sizes.value) !==
    JSON.stringify(["S", "M", "L"])
  ) {
    throw new Error("Size extraction failed.");
  }

  console.log(
    "ALL EXTRACTION RUNNER INTEGRATION TESTS PASSED"
  );
}

runTest();
