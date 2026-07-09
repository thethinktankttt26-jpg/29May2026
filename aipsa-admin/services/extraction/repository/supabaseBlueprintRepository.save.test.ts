import * as fs from "fs";

import {
  runBlueprintFactory,
} from "../factory/blueprintFactory";

import {
  SupabaseBlueprintRepository,
} from "./supabaseBlueprintRepository";

import {
  BlueprintRecord,
} from "./blueprintRepositoryTypes";

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

  const repository =
    new SupabaseBlueprintRepository();

  const blueprint: BlueprintRecord = {

    id: crypto.randomUUID(),

    retailerId:
      "77a388fd-303b-4a68-b17b-44f259016e80",

    category:
      "Clothing",

    version: 0,

    status:
      "DRAFT",

    confidence:
      0.95,

    extractionConfig:
      result.extractionConfig,

    createdBy:
      "AI",

    notes:
      "Blueprint generated during integration test.",

    createdAt:
      new Date(),

    activatedAt:
      null,

    archivedAt:
      null,

  };

  await repository.save(
    blueprint
  );

  console.log(
    "BLUEPRINT SAVED SUCCESSFULLY"
  );

}

runTest().catch(error => {

  console.error(error);

  process.exit(1);

});