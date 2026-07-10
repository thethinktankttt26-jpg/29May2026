import {
  RuntimeHealthAnalyzer,
} from "./runtimeHealthAnalyzer";

import {
  shouldTriggerRepair,
} from "./repairTrigger";

import {
  RuntimeProduct,
} from "../runtime/runtimeTypes";

async function main() {

  const analyzer =
    new RuntimeHealthAnalyzer();

  const product: RuntimeProduct = {

    productName: "Nike Air Max",

    brand: "Nike",

    productIdentifier: null,

    currentPrice: "39.99",

    originalPrice: null,

    currency: "GBP",

    primaryImage: null,

    additionalImages: [],

    sizes: [],

    colours: [],

    stockAvailability: null,

  };

  const health =
    analyzer.analyze(
      product
    );

  console.log(
    "STATUS:",
    health.status
  );

  console.log(
    "HEALTH SCORE:",
    health.healthScore
  );

  console.log(
    "MISSING:",
    health.missingFields
  );

  console.log(
    "RECOMMENDATION:",
    health.recommendation
  );

  console.log(
    "TRIGGER REPAIR:",
    shouldTriggerRepair(
      health
    )
  );

  console.log();

  console.log(
    "RUNTIME HEALTH TEST PASSED"
  );

}

main();