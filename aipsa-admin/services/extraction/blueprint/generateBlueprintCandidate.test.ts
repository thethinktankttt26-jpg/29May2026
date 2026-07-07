import * as fs from "fs";

import { discoverSignals } from "../discovery/signalDiscovery";
import { generateBlueprintCandidate } from "./generateBlueprintCandidate";

async function runTest() {
  const html = fs.readFileSync(
    "services/extraction/acquisition/fixtures/next-product-st056123.html",
    "utf8"
  );

  const discovery = discoverSignals(html);

  const candidate = generateBlueprintCandidate(
    "Next",
    "Clothing",
    discovery
  );

  console.log("RETAILER:", candidate.retailer);
  console.log("CATEGORY:", candidate.category);

  console.log("\nFIELDS");

  for (const field of candidate.fields) {
    console.log(
      `${field.fieldName} =>`,
      field.selected?.value ?? null
    );
  }

  const productName = candidate.fields.find(
    f => f.fieldName === "productName"
  )?.selected?.value;

  const brand = candidate.fields.find(
    f => f.fieldName === "brand"
  )?.selected?.value;

  const productGroup = candidate.fields.find(
    f => f.fieldName === "productIdentifier"
  )?.selected?.value;

  if (productName === null) {
    throw new Error("Product name not generated.");
  }

  if (brand !== "Next") {
    throw new Error("Brand not generated.");
  }

  if (productGroup !== "st056123") {
    throw new Error("Product identifier not generated.");
  }

  console.log("\nBLUEPRINT CANDIDATE TEST PASSED");
}

runTest();