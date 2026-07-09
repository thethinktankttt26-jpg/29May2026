import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

export function detectFailedFields(
  validation: BlueprintValidationResult
): string[] {

  const failedFields = new Set<string>();

  for (const issue of validation.issues) {

    if (issue.severity === "ERROR") {

      failedFields.add(
        issue.field
      );

    }

  }

  return Array.from(
    failedFields
  ).sort();

}