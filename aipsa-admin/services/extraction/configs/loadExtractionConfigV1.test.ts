import {
  loadExtractionConfigV1,
} from "./loadExtractionConfigV1";

async function runTest() {
  const config =
    await loadExtractionConfigV1(
      "services/extraction/configs/manual/next/clothing-v1.json"
    );

  console.log(
    "CONTRACT VERSION:",
    config.contractVersion
  );

  console.log(
    "CONFIG TYPE:",
    config.configScope.type
  );

  console.log(
    "CATEGORY:",
    config.configScope.category
  );

  console.log(
    "FIELD COUNT:",
    Object.keys(config.fields).length
  );

  const requiredFields = [
    "productName",
    "brand",
    "productIdentifier",
    "currentPrice",
    "originalPrice",
    "currency",
    "primaryImage",
    "additionalImages",
    "sizes",
    "colours",
    "stockAvailability",
  ];

  for (const field of requiredFields) {
    if (!(field in config.fields)) {
      throw new Error(
        `Missing field: ${field}`
      );
    }
  }

  console.log(
    "ALL REQUIRED FIELDS PRESENT"
  );

  console.log(
    "LOADER TEST PASSED"
  );
}

runTest();
