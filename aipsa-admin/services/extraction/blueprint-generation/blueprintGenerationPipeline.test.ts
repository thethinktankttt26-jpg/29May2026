import {
  BlueprintGenerationPipeline,
} from "./blueprintGenerationPipeline";

async function main() {

  const pipeline =
    new BlueprintGenerationPipeline();

  const result =
    await pipeline.generate({

      retailerId:
        "NEXT",

      category:
        "Clothing",

      representatives: {

        retailerId:
          "NEXT",

        category:
          "Clothing",

        products: [],

      },

    });

  console.log();

  console.log(
    "CONFIDENCE:",
    result.confidence
  );

  console.log();

  console.log(
    "BLUEPRINT GENERATION PIPELINE PASSED"
  );

}

main();