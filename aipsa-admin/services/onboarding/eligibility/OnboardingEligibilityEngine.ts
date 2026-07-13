import {
  EligibilityResult,
} from "./EligibilityResult";

import {
  RetailerReadinessService,
} from "../readiness";

export class OnboardingEligibilityEngine {

  constructor(

    private readonly readiness =
      new RetailerReadinessService(),

  ) {}

  async evaluate(
    retailerId: string
  ): Promise<EligibilityResult> {

    const readiness =
      await this.readiness.evaluate(
        retailerId
      );

    return {

      eligible:
        readiness.ready,

      reasons:
        readiness.reasons,

    };

  }

}