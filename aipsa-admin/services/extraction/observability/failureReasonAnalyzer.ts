import {
  ExtractionMetric,
} from "./observabilityTypes";

export interface FailureReason {

  field: string;

  reason:
    | "NOT_EXTRACTED"
    | "UNKNOWN";

}

export class FailureReasonAnalyzer {

  analyze(
    metrics: ExtractionMetric[]
  ): FailureReason[] {

    return metrics
      .filter(
        metric => !metric.extracted
      )
      .map(
        metric => ({

          field: metric.field,

          reason: "NOT_EXTRACTED",

        })
      );

  }

}