import { RuntimeConfiguration } from "./RuntimeConfiguration";
import { RuntimeValidationResult } from "./RuntimeValidationResult";

export class RuntimeValidationService {

  validate(
    runtime: RuntimeConfiguration
  ): RuntimeValidationResult {

    const errors: string[] = [];

    if (!runtime.retailerId) {
      errors.push("Retailer ID is missing.");
    }

    if (!runtime.category) {
      errors.push("Category is missing.");
    }

    if (!runtime.blueprintId) {
      errors.push("Blueprint ID is missing.");
    }

    if (runtime.blueprintVersion <= 0) {
      errors.push("Blueprint version is invalid.");
    }

    if (!runtime.extractionConfig) {
      errors.push("Extraction configuration is missing.");
    }

    if (runtime.status !== "GENERATED") {
      errors.push(
        `Runtime status must be 'GENERATED' before validation. Current status: '${runtime.status}'.`
      );
    }

    if (!runtime.ready) {
      errors.push("Runtime is not marked as ready.");
    }

    return {
      valid: errors.length === 0,
      errors,
    };

  }

}