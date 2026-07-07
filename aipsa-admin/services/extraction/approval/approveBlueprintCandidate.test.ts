import * as fs from "fs";

import { discoverSignals } from "../discovery/signalDiscovery";
import { generateBlueprintCandidate } from "../blueprint/generateBlueprintCandidate";
import { validateBlueprintCandidate } from "../validation/validateBlueprintCandidate";
import { approveBlueprintCandidate } from "./approveBlueprintCandidate";

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

  const approval =
    approveBlueprintCandidate(validation);

  console.log("VALIDATION:", validation.status);

  console.log("DECISION:", approval.decision);

  console.log("APPROVED:", approval.approved);

  console.log("MESSAGE:", approval.message);

  if (approval.decision !== "NEEDS_REVIEW") {
    throw new Error(
      "Incorrect approval decision."
    );
  }

  if (approval.approved !== false) {
    throw new Error(
      "Approval flag incorrect."
    );
  }

  console.log(
    "\nAPPROVAL WORKFLOW TEST PASSED"
  );
}

runTest();