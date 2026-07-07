import * as fs from "fs";

import { discoverSignals } from "../discovery/signalDiscovery";
import { generateBlueprintCandidate } from "../blueprint/generateBlueprintCandidate";
import { validateBlueprintCandidate } from "./validateBlueprintCandidate";

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

  const validation =
    validateBlueprintCandidate(candidate);

  console.log("STATUS:", validation.status);
  console.log("TOTAL FIELDS:", validation.totalFields);
  console.log("POPULATED:", validation.populatedFields);
  console.log(
    "COVERAGE:",
    validation.coveragePercentage + "%"
  );

  console.log("\nISSUES");

  if (validation.issues.length === 0) {
    console.log("None");
  } else {
    for (const issue of validation.issues) {
      console.log(
        `[${issue.severity}] ${issue.field} - ${issue.message}`
      );
    }
  }

  console.log("\nVALIDATION TEST PASSED");
}

runTest();