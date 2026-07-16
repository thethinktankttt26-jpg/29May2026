import {
  RetailerReadiness,
} from "./RetailerReadiness";

import {
  retailerExists,
  retailerEnabled,
} from "../../retailers/retailerService";

import {
  SupabaseBlueprintRepository,
} from "../../extraction/repository/supabaseBlueprintRepository";

export class RetailerReadinessService {

  constructor(
    private readonly blueprintRepository =
      new SupabaseBlueprintRepository(),
  ) {}

  async evaluate(
    retailerId: string
  ): Promise<RetailerReadiness> {

    const exists =
      await retailerExists(retailerId);

    const enabled =
      exists
        ? await retailerEnabled(retailerId)
        : false;

    const blueprintApproved =
      exists
        ? await this.blueprintRepository.hasActiveBlueprint(
            retailerId
          )
        : false;

    const reasons: string[] = [];

    if (!exists) {
      reasons.push("Retailer does not exist.");
    }

    if (exists && !enabled) {
      reasons.push("Retailer is disabled.");
    }

    if (exists && !blueprintApproved) {
      reasons.push("No active blueprint found.");
    }

    return {

      retailerExists: exists,

      retailerEnabled: enabled,

      blueprintApproved,

      extractionConfigurationApproved: true,

      retailerActive: false,

      onboardingRunning: false,

      ready: reasons.length === 0,

      reasons,

    };

  }

}