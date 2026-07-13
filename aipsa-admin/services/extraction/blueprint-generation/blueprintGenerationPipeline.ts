import {
  AiLearningEngine,
} from "../ai/aiLearningEngine";

import {
  MockAiProvider,
} from "../ai/mockAiProvider";

import {
  SupabaseBlueprintRepository,
} from "../repository/supabaseBlueprintRepository";

import {
  BlueprintGenerationRequest,
  BlueprintGenerationResult,
} from "./blueprintGenerationTypes";

export class BlueprintGenerationPipeline {

  constructor(

    private readonly learningEngine =
      new AiLearningEngine(
        new MockAiProvider(),
        new SupabaseBlueprintRepository(),
      ),

  ) {}

  async generate(
    request: BlueprintGenerationRequest
  ): Promise<BlueprintGenerationResult> {

    /*
      Phase 5 Blueprint Generation Pipeline

      Acquisition
            ↓
      Reduction
            ↓
      AI Learning
            ↓
      Validation
            ↓
      Approval
            ↓
      Repository

      NOTE:
      The Acquisition and Reduction stages will
      provide the reducedHtml during Phase 6
      onboarding. For now we use an empty string
      to keep the pipeline aligned with the new
      AiLearningEngine contract.
    */

    const learning =
      await this.learningEngine.learn({

        retailer:
          request.retailerId,

        category:
          request.category,

        reducedHtml: "",

      });

    return {

      blueprint:
        learning.extractionConfig,

      confidence:
        learning.confidence,

    };

  }

}