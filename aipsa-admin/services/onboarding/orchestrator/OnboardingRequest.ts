export interface OnboardingRequest {

  retailerId: string;

  /*
    Retailers are onboarded one category
    at a time.

    This category is used to locate the
    active blueprint and extraction
    configuration.
  */
  category: string;

}