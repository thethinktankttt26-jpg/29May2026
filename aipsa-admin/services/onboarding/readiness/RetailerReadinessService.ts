import {
  RetailerReadiness,
} from "./RetailerReadiness";

export class RetailerReadinessService {

  async evaluate(
    retailerId: string
  ): Promise<RetailerReadiness> {

    /*
      Phase 6.1.3

      This service centralises all
      operational readiness checks.

      Integrations will be connected
      incrementally.

      Planned checks

      • Retailer exists
      • Retailer enabled
      • Blueprint approved
      • Extraction configuration approved
      • Retailer ACTIVE
      • Onboarding already running
    */

    void retailerId;

    return {

      retailerExists: true,

      retailerEnabled: true,

      blueprintApproved: true,

      extractionConfigurationApproved: true,

      retailerActive: false,

      onboardingRunning: false,

      ready: true,

      reasons: [],

    };

  }

}