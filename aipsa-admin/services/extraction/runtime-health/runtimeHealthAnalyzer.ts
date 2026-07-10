import {
  RuntimeHealthResult,
} from "./runtimeHealthTypes";

import {
  RuntimeProduct,
} from "../runtime/runtimeTypes";

import {
  calculateHealthScore,
} from "./healthScoreCalculator";

export class RuntimeHealthAnalyzer {

  analyze(
    product: RuntimeProduct
  ): RuntimeHealthResult {

    const missingFields: string[] = [];

    for (
      const [field, value]
      of Object.entries(product)
    ) {

      if (
        value === null ||
        (Array.isArray(value) &&
          value.length === 0)
      ) {

        missingFields.push(field);

      }

    }

    const healthScore =
      calculateHealthScore(
        missingFields
      );

    return {

      status:
        healthScore >= 90
          ? "HEALTHY"
          : healthScore >= 70
          ? "WARNING"
          : "CRITICAL",

      healthScore,

      missingFields,

      recommendation:
        healthScore >= 90
          ? "NONE"
          : healthScore >= 70
          ? "MONITOR"
          : "REPAIR",

    };

  }

}