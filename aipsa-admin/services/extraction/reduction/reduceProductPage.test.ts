import { readFile } from "fs/promises";

import {
  reduceProductPage,
} from "./reduceProductPage";

async function runTest() {
  const fixturePath =
    "services/extraction/acquisition/fixtures/controlled-product-sample.html";

  const html = await readFile(fixturePath, "utf-8");

  const result = reduceProductPage(html);

  console.log("ORIGINAL LENGTH:", result.originalLength);
  console.log("REDUCED LENGTH:", result.reducedLength);
  console.log("REMOVED LENGTH:", result.removedLength);
  console.log(
    "REDUCTION PERCENTAGE:",
    result.reductionPercentage
  );

  console.log(
    "HAS PRODUCT NAME:",
    result.html.includes(
      "White Regular Fit Essential Crew Neck T-Shirt"
    )
  );

  console.log(
    "HAS PRICE:",
    result.html.includes("£8.00")
  );

  console.log(
    "HAS PRODUCT CODE:",
    result.html.includes("369510")
  );

  console.log(
    "HAS SIZES:",
    ["S", "M", "L"].every((size) =>
      result.html.includes(`>${size}<`)
    )
  );

  console.log(
    "HAS STOCK:",
    result.html.includes("In Stock")
  );

  console.log(
    "HAS JSON-LD:",
    result.html.includes("application/ld+json") &&
      result.html.includes('"sku": "369510"') &&
      result.html.includes('"priceCurrency": "GBP"')
  );

  console.log(
    "REMOVED NORMAL SCRIPT:",
    !result.html.includes(
      "irrelevant application JavaScript"
    )
  );

  console.log(
    "REMOVED EVENT HANDLERS:",
    !result.html.includes("onclick=") &&
      !result.html.includes("onload=")
  );
}

runTest();
