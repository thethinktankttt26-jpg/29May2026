import {
  AiLearningRequest,
} from "./aiLearningTypes";

import {
  AiLearningEngineResult,
} from "./aiLearningEngineTypes";

import {
  AiProvider,
} from "./aiProvider";

import {
  extractionConfigToBlueprintCandidate,
} from "./adapters/extractionConfigAdapter";

import {
  validateBlueprintCandidate,
} from "../validation/validateBlueprintCandidate";

import {
  approveBlueprintCandidate,
} from "../approval/approveBlueprintCandidate";

import {
  BlueprintRepository,
} from "../repository/blueprintRepository";

import {
  NewBlueprintRecord,
} from "../repository/blueprintRepositoryTypes";

export class AiLearningEngine {

  constructor(

    private readonly provider: AiProvider,

    private readonly repository: BlueprintRepository,

  ) {}

  async learn(
    request: AiLearningRequest
  ): Promise<AiLearningEngineResult> {

    const learning =
      await this.provider.learn(
        request
      );

    const candidate =
      extractionConfigToBlueprintCandidate(
        request.retailer,
        request.category,
        learning.extractionConfig
      );

    const validation =
      validateBlueprintCandidate(
        candidate
      );

    const approval =
      approveBlueprintCandidate(
        validation
      );

    const blueprint: NewBlueprintRecord = {

      retailerId:
        request.retailer,

      category:
        request.category,

      status:
        approval.approved
          ? "ACTIVE"
          : "REVIEW",

      confidence:
        learning.confidence,

      extractionConfig:
        learning.extractionConfig,

      createdBy: "AI",

      notes: null,

      createdAt:
        new Date(),

      activatedAt:
        approval.approved
          ? new Date()
          : null,

      archivedAt: null,

    };

    const version =
      await this.repository.save(
        blueprint
      );

    return {

      extractionConfig:
        learning.extractionConfig,

      validation,

      approval,

      confidence:
        learning.confidence,

      model:
        learning.model,

      saved: true,

      version,

    };

  }

}