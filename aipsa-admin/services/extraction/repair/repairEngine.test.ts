import {
  RepairEngine,
} from "./repairEngine";

import {
  MockRepairProvider,
} from "./mockRepairProvider";

import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

import {
  ExtractionConfigV1,
  ExtractionRule,
} from "../contracts/extractionConfigV1";

const validation: BlueprintValidationResult = {

  status: "FAILED",

  totalFields: 11,

  populatedFields: 8,

  coveragePercentage: 72.73,

  issues: [

    {
      field: "currentPrice",
      severity: "ERROR",
      message: "Missing selector",
    },

    {
      field: "sizes",
      severity: "ERROR",
      message: "Missing selector",
    },

  ],

};

function emptyRule(
  required = true,
  multiple = false
): ExtractionRule {

  return {

    source: "JSON_LD",

    selectors: [],

    multiple,

    transforms: [],

    required,

  };

}

const config: ExtractionConfigV1 = {

  contractVersion: "1.0",

  configScope: {
    type: "CATEGORY",
    category: "Clothing",
  },

  fields: {

    productName: emptyRule(),

    brand: emptyRule(),

    productIdentifier: emptyRule(),

    currentPrice: emptyRule(),

    originalPrice: emptyRule(false),

    currency: emptyRule(),

    primaryImage: emptyRule(),

    additionalImages: emptyRule(false, true),

    sizes: emptyRule(true, true),

    colours: emptyRule(true, true),

    stockAvailability: emptyRule(),

  },

};

async function main() {

  const provider =
    new MockRepairProvider();

  const engine =
    new RepairEngine(
      provider
    );

  const result =
    await engine.repair({

      retailer: "Next",

      category: "Clothing",

      reducedHtml:
        "<html></html>",

      currentConfig:
        config,

      validation,

    });

  console.log(
    "MODEL:",
    result.model
  );

  console.log(
    "CONFIDENCE:",
    result.confidence
  );

  console.log(
    "FAILED FIELDS:",
    result.repairedFields
  );

  if (
    result.repairedFields.length !== 2
  ) {
    throw new Error(
      "Expected exactly 2 repaired fields."
    );
  }

  if (
    result.repairedFields[0] !== "currentPrice"
  ) {
    throw new Error(
      "Expected currentPrice to require repair."
    );
  }

  if (
    result.repairedFields[1] !== "sizes"
  ) {
    throw new Error(
      "Expected sizes to require repair."
    );
  }

  console.log();

  console.log(
    "REPAIR ENGINE TEST PASSED"
  );

}

main();