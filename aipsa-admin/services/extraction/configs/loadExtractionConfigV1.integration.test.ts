import {
  loadExtractionConfigV1,
} from "./loadExtractionConfigV1";

import {
  runExtraction,
} from "../runner/runExtraction";

import {
  readFile,
} from "fs/promises";

async function runTest() {
  const config =
    await loadExtractionConfigV1(
      "services/extraction/configs/manual/next/clothing-v1.json"
    );

  const html = await readFile(
    "services/extraction/acquisition/fixtures/next-product-st056123.html",
    "utf8"
  );

  const result = runExtraction(
    html,
    config
  );

  console.log("RUN SUCCESS:", result.success);
  console.log("ERRORS:", result.errors);

  console.log(
    "PRODUCT:",
    result.fields.productName.value
  );

  console.log(
    "BRAND:",
    result.fields.brand.value
  );

  console.log(
    "PRODUCT GROUP:",
    result.fields.productIdentifier.value
  );

  console.log(
    "PRICE:",
    result.fields.currentPrice.value
  );

  console.log(
    "CURRENCY:",
    result.fields.currency.value
  );

  console.log(
    "PRIMARY IMAGE:",
    result.fields.primaryImage.value
  );

  console.log(
    "SIZE COUNT:",
    Array.isArray(result.fields.sizes.value)
      ? result.fields.sizes.value.length
      : 0
  );

  console.log(
    "COLOURS:",
    result.fields.colours.value
  );

  console.log(
    "AVAILABILITY COUNT:",
    Array.isArray(result.fields.stockAvailability.value)
      ? result.fields.stockAvailability.value.length
      : 0
  );

  if (!result.success) {
    throw new Error(
      "Extraction failed."
    );
  }

  if (
    result.fields.productName.value !==
    "Essential Crew Neck Cotton T-Shirt"
  ) {
    throw new Error(
      "Incorrect product name."
    );
  }

  if (
    result.fields.brand.value !==
    "Next"
  ) {
    throw new Error(
      "Incorrect brand."
    );
  }

  if (
    result.fields.productIdentifier.value !==
    "st056123"
  ) {
    throw new Error(
      "Incorrect ProductGroup ID."
    );
  }

  if (
    result.fields.currentPrice.value !==
    "8.00"
  ) {
    throw new Error(
      "Incorrect price."
    );
  }

  if (
    result.fields.currency.value !==
    "GBP"
  ) {
    throw new Error(
      "Incorrect currency."
    );
  }

  if (
    !Array.isArray(result.fields.sizes.value) ||
    result.fields.sizes.value.length !== 23
  ) {
    throw new Error(
      "Incorrect size extraction."
    );
  }

  console.log(
    "END-TO-END JSON CONFIG TEST PASSED"
  );
}

runTest();
