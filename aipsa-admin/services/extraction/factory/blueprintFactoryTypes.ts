import {
  BlueprintCandidate,
} from "../blueprint/candidateTypes";

import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

import {
  BlueprintApprovalResult,
} from "../approval/approvalTypes";

import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export interface BlueprintFactoryResult {

  candidate: BlueprintCandidate;

  validation: BlueprintValidationResult;

  approval: BlueprintApprovalResult;

  extractionConfig: ExtractionConfigV1;

}