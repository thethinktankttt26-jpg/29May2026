import * as fs from "fs";

import {
  runBlueprintFactory,
} from "./blueprintFactory";

async function runTest() {

  const html = fs.readFileSync(
    "services/extraction/acquisition/fixtures/next-product-st056123.html",
    "utf8"
  );

  const result =
    runBlueprintFactory(
      "Next",
      "Clothing",
      html
    );

  console.log("RETAILER:", result.candidate.retailer);

  console.log("CATEGORY:", result.candidate.category);

  console.log(
    "VALIDATION:",
    result.validation.status
  );

  console.log(
    "APPROVAL:",
    result.approval.decision
  );

  console.log(
    "CONTRACT:",
    result.extractionConfig.contractVersion
  );

  if (
    result.extractionConfig.configScope.type !==
    "CATEGORY"
  ) {
    throw new Error(
      "Incorrect config scope."
    );
  }

  console.log(
    "CONFIG CATEGORY:",
    result.extractionConfig.configScope.category
  );

  console.log(
    "FIELD COUNT:",
    Object.keys(
      result.extractionConfig.fields
    ).length
  );

  if (
    Object.keys(
      result.extractionConfig.fields
    ).length !== 11
  ) {
    throw new Error(
      "Incorrect field count."
    );
  }

  console.log(
    "\nBLUEPRINT FACTORY INTEGRATION TEST PASSED"
  );

}

runTest();