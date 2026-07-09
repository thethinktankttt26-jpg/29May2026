import {
  AiLearningEngine,
} from "./aiLearningEngine";

import {
  MockAiProvider,
} from "./mockAiProvider";

import {
  InMemoryBlueprintRepository,
} from "../testing/inMemoryBlueprintRepository";

async function main() {

  const provider =
    new MockAiProvider();

  const repository =
    new InMemoryBlueprintRepository();

  const engine =
    new AiLearningEngine(
      provider,
      repository
    );

  const result =
    await engine.learn({

      retailer: "Next",

      category: "Clothing",

      reducedHtml:
        "<html></html>",

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
    "VALIDATION:",
    result.validation.status
  );

  console.log(
    "APPROVAL:",
    result.approval.decision
  );

  console.log(
    "VERSION:",
    result.version
  );

  console.log(
    "SAVED:",
    result.saved
  );

  if (!result.saved) {
    throw new Error(
      "Blueprint was not saved."
    );
  }

  if (result.version !== 1) {
    throw new Error(
      "Expected version 1."
    );
  }

  console.log();

  console.log(
    "AI LEARNING ENGINE TEST PASSED"
  );

}

main();