export type ExtractionTrend =
  | "IMPROVING"
  | "STABLE"
  | "DEGRADING";

export class TrendAnalyzer {

  analyze(
    scores: number[]
  ): ExtractionTrend {

    if (
      scores.length < 2
    ) {

      return "STABLE";

    }

    const latest =
      scores[
        scores.length - 1
      ];

    const previous =
      scores[
        scores.length - 2
      ];

    if (
      latest > previous
    ) {

      return "IMPROVING";

    }

    if (
      latest < previous
    ) {

      return "DEGRADING";

    }

    return "STABLE";

  }

}