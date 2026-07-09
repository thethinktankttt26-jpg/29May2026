import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

import {
  BlueprintApprovalResult,
} from "../approval/approvalTypes";

export interface AiLearningEngineResult {

  extractionConfig: ExtractionConfigV1;

  validation: BlueprintValidationResult;

  approval: BlueprintApprovalResult;

  confidence: number;

  model: string;

  saved: boolean;

  version: number | null;

}