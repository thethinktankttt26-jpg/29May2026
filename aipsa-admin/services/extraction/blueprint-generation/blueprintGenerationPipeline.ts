import {
  AiLearningEngine,
} from "../ai/aiLearningEngine";

import {
  BlueprintGenerationRequest,
  BlueprintGenerationResult,
} from "./blueprintGenerationTypes";

export class BlueprintGenerationPipeline {

  constructor(

    private readonly learningEngine =
      new AiLearningEngine(),

  ) {}

  async generate(
    request:
      BlueprintGenerationRequest
  ): Promise<
    BlueprintGenerationResult
  > {

    /*
      Phase 5.5.4

      Acquisition

      ↓

      Reduction

      ↓

      AI Learning

      These stages are connected
      here. In the next sprint,
      the Acquisition and Reduction
      outputs will be passed into
      the learning engine.
    */

    const learning =
      await this.learningEngine.learn({

        retailer:
          request.retailerId,

        category:
          request.category,

      });

    return {

      blueprint:
        learning.blueprint,

      confidence:
        learning.confidence,

    };

  }

}