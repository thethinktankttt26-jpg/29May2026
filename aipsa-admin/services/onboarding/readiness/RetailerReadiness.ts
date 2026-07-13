export interface RetailerReadiness {

  retailerExists: boolean;

  retailerEnabled: boolean;

  blueprintApproved: boolean;

  extractionConfigurationApproved: boolean;

  retailerActive: boolean;

  onboardingRunning: boolean;

  ready: boolean;

  reasons: string[];

}