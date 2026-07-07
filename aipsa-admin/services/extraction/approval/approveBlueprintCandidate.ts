import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

import {
  ApprovalDecision,
  BlueprintApprovalResult,
} from "./approvalTypes";

export function approveBlueprintCandidate(
  validation: BlueprintValidationResult
): BlueprintApprovalResult {

  let decision: ApprovalDecision;
  let approved = false;
  let message = "";

  switch (validation.status) {

    case "READY":
      decision = "APPROVED";
      approved = true;
      message =
        "Blueprint is production ready.";
      break;

    case "REVIEW_REQUIRED":
      decision = "NEEDS_REVIEW";
      message =
        "Blueprint requires manual review before approval.";
      break;

    default:
      decision = "REJECTED";
      message =
        "Blueprint cannot be approved due to validation errors.";
      break;
  }

  return {
    decision,
    approved,
    message,
  };
}