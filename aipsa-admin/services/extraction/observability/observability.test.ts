import {
  MetricsCollector,
} from "./metricsCollector";

import {
  FailureReasonAnalyzer,
} from "./failureReasonAnalyzer";

import {
  TrendAnalyzer,
} from "./trendAnalyzer";

import {
  ExtractionMetric,
} from "./observabilityTypes";

async function main() {

  const metrics: ExtractionMetric[] = [

    {
      field: "productName",
      extracted: true,
      durationMs: 2,
    },

    {
      field: "currentPrice",
      extracted: false,
      durationMs: 1,
    },

    {
      field: "sizes",
      extracted: false,
      durationMs: 3,
    },

    {
      field: "currency",
      extracted: true,
      durationMs: 1,
    },

  ];

  const collector =
    new MetricsCollector();

  const summary =
    collector.collect(
      metrics
    );

  const analyzer =
    new FailureReasonAnalyzer();

  const reasons =
    analyzer.analyze(
      metrics
    );

  const trendAnalyzer =
    new TrendAnalyzer();

  const trend =
    trendAnalyzer.analyze([
      100,
      95,
      90,
      80,
    ]);

  console.log(
    "SUMMARY:",
    summary
  );

  console.log();

  console.log(
    "FAILURE REASONS:",
    reasons
  );

  console.log();

  console.log(
    "TREND:",
    trend
  );

  console.log();

  if (
    trend !== "DEGRADING"
  ) {
    throw new Error(
      "Expected degrading trend."
    );
  }

  if (
    summary.failedFields.length !== 2
  ) {
    throw new Error(
      "Expected 2 failed fields."
    );
  }

  console.log(
    "OBSERVABILITY TEST PASSED"
  );

}

main();