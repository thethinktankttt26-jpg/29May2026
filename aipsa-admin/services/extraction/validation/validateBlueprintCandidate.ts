import {
  BlueprintCandidate,
  CandidateField,
} from "../blueprint/candidateTypes";

import {
  BlueprintValidationResult,
  ValidationIssue,
  ValidationStatus,
} from "./validationTypes";

const REQUIRED_FIELDS = [
  "productName",
  "brand",
  "productIdentifier",
  "currentPrice",
  "currency",
  "primaryImage",
  "sizes",
  "colours",
  "stockAvailability",
];

function hasSelectedEvidence(
  field: CandidateField | undefined
): boolean {

  if (!field?.selected) {
    return false;
  }

  return (
    field.selected.path.trim().length > 0 &&
    field.selected.source.length > 0
  );

}

export function validateBlueprintCandidate(
  candidate: BlueprintCandidate
): BlueprintValidationResult {

  const issues: ValidationIssue[] = [];

  const totalFields =
    candidate.fields.length;

  const populatedFields =
    candidate.fields.filter(
      field => hasSelectedEvidence(field)
    ).length;

  const coveragePercentage =
    totalFields === 0
      ? 0
      : Number(
          (
            populatedFields /
            totalFields *
            100
          ).toFixed(2)
        );

  for (const requiredField of REQUIRED_FIELDS) {

    const field =
      candidate.fields.find(
        item =>
          item.fieldName === requiredField
      );

    if (!field) {

      issues.push({
        field: requiredField,
        severity: "ERROR",
        message:
          "Required field is missing from the blueprint candidate.",
      });

      continue;

    }

    if (!hasSelectedEvidence(field)) {

      issues.push({
        field: requiredField,
        severity: "ERROR",
        message:
          "Required field has no selected extraction rule.",
      });

    }

  }

  for (const field of candidate.fields) {

    for (const warning of field.warnings) {

      issues.push({
        field: field.fieldName,
        severity: "WARNING",
        message: warning,
      });

    }

  }

  const hasErrors =
    issues.some(
      issue =>
        issue.severity === "ERROR"
    );

  const hasWarnings =
    issues.some(
      issue =>
        issue.severity === "WARNING"
    );

  let status: ValidationStatus;

  if (hasErrors) {

    status = "FAILED";

  } else if (hasWarnings) {

    status = "REVIEW_REQUIRED";

  } else {

    status = "READY";

  }

  return {

    status,

    totalFields,

    populatedFields,

    coveragePercentage,

    issues,

  };

}