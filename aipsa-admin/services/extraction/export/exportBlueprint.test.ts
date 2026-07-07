import * as fs from "fs";

import { discoverSignals } from "../discovery/signalDiscovery";
import { generateBlueprintCandidate } from "../blueprint/generateBlueprintCandidate";
import { validateBlueprintCandidate } from "../validation/validateBlueprintCandidate";
import { approveBlueprintCandidate } from "../approval/approveBlueprintCandidate";
import { exportBlueprint } from "./exportBlueprint";

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
  console.log("APPROVAL:", approval.decision);

  const config =
    exportBlueprint(candidate);

  console.log("CONTRACT:", config.contractVersion);
  console.log("CATEGORY:", config.configScope.category);

  console.log("\nFIELDS");

  for (const [name, rule] of Object.entries(config.fields)) {

  console.log(`\n${name}`);

  console.log("  SOURCE:", rule.source);

  console.log(
    "  FILTER:",
    rule.jsonLdFilter ?? "None"
  );

  console.log(
    "  SELECTORS:",
    rule.selectors
  );

}

  if (config.contractVersion !== "1.0") {
    throw new Error("Incorrect contract version.");
  }

  if (config.configScope.type !== "CATEGORY") {
    throw new Error("Incorrect scope.");
  }

  if (
    Object.keys(config.fields).length !== 11
  ) {
    throw new Error(
      "Incorrect number of exported fields."
    );
  }

  console.log(
    "\nPRODUCTION BLUEPRINT EXPORT TEST PASSED"
  );
}

runTest();