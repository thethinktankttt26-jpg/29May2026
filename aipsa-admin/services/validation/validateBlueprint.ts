export type BlueprintValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type BlueprintForValidation = {
  blueprint?: {
    homepage?: string;
    categories?: string[];
    sale?: string[];
    products?: string[];
    account?: string[];
    help?: string[];
  };

  confidence_score?: number;
  status?: string;
};

export function validateBlueprint(
  record: BlueprintForValidation
): BlueprintValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const blueprint = record.blueprint;

  // Blueprint must exist

  if (!blueprint) {
    errors.push("Blueprint data is missing.");

    return {
      valid: false,
      errors,
      warnings,
    };
  }

  // Homepage is required

  if (!blueprint.homepage?.trim()) {
    errors.push("Homepage is missing.");
  }

  // At least one configured retailer category is required

  if (
    !Array.isArray(blueprint.categories) ||
    blueprint.categories.length === 0
  ) {
    errors.push(
      "At least one configured retailer category is required."
    );
  }

  // At least one product link must be discovered

  if (
    !Array.isArray(blueprint.products) ||
    blueprint.products.length === 0
  ) {
    errors.push(
      "At least one product link must be discovered."
    );
  }

  // Confidence score must be valid

  if (
    typeof record.confidence_score !== "number" ||
    record.confidence_score < 0 ||
    record.confidence_score > 100
  ) {
    errors.push(
      "Confidence score must be between 0 and 100."
    );
  }

  // Only DRAFT blueprints can proceed through validation

  if (record.status !== "DRAFT") {
    errors.push(
      "Only a DRAFT blueprint can be validated for approval."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}