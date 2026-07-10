import {
  ExtractionMetric,
  ObservabilityResult,
} from "./observabilityTypes";

export class MetricsCollector {

  collect(
    metrics: ExtractionMetric[]
  ): ObservabilityResult {

    const failedFields =
      metrics
        .filter(
          metric => !metric.extracted
        )
        .map(
          metric => metric.field
        );

    const totalDuration =
      metrics.reduce(
        (
          sum,
          metric
        ) =>
          sum +
          metric.durationMs,
        0
      );

    return {

      totalFields:
        metrics.length,

      extractedFields:
        metrics.length -
        failedFields.length,

      failedFields,

      averageDurationMs:
        metrics.length === 0
          ? 0
          : totalDuration /
            metrics.length,

    };

  }

}