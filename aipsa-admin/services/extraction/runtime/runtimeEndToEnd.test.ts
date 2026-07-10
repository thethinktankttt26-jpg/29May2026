import {
  acquireProductPage,
} from "../acquisition/acquireProductPage";

import {
  reduceProductPage,
} from "../reduction/reduceProductPage";

import {
  loadExtractionConfigV1,
} from "../configs/loadExtractionConfigV1";

import {
  RuntimeExecutor,
} from "./runtimeExecutor";

import {
  RuntimeEngine,
} from "./runtimeEngine";

async function main() {

  const url =
    "https://www.next.co.uk/";

  const acquisition =
    await acquireProductPage(
      url
    );

  if (
    acquisition.status !== "SUCCESS" ||
    !acquisition.html
  ) {

    throw new Error(
      "Unable to acquire product page."
    );

  }

  const reduction =
    reduceProductPage(
      acquisition.html
    );

  const loader = {

    async load() {

      return loadExtractionConfigV1(

        "services/extraction/configs/manual/next/clothing-v1.json"

      );

    },

  };

  const runtime =
    new RuntimeEngine(

      loader,

      new RuntimeExecutor(),

    );

  const result =
    await runtime.execute({

      retailer:
        "NEXT",

      category:
        "Clothing",

      html:
        reduction.html,

    });

  console.log();

  console.log(
    result.product
  );

  console.log();

  console.log(
    "RUNTIME END-TO-END PASSED"
  );

}

main();