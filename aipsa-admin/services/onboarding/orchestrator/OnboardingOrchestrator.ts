import {
  WorkflowEngine,
  WorkflowState,
} from "../engine";

import {
  OnboardingRequest,
} from "./OnboardingRequest";

import {
  OnboardingResult,
} from "./OnboardingResult";

export class OnboardingOrchestrator {

  constructor(

    private readonly workflow =
      new WorkflowEngine(),


  ) {}

  async onboard(
    request: OnboardingRequest
  ): Promise<OnboardingResult> {

    /*
      Phase 6.4

      The orchestration skeleton.

      Existing services will be connected
      incrementally during later phases.

      At this milestone we prove that one
      orchestrator coordinates the entire
      onboarding lifecycle.
    */

    let current =
  WorkflowState.ELIGIBILITY;

    while (
      !this.workflow.isCompleted(
        current
      )
    ) {

     switch (current) {

  case WorkflowState.ELIGIBILITY:

    /*
      Phase 6.1
      Onboarding Eligibility Engine.
    */

    break;

  case WorkflowState.ONBOARDING_SESSION:

    /*
      Phase 6.2
      Create onboarding session.
    */

    break;

  case WorkflowState.RUNTIME_CONFIGURATION:

    /*
      Phase 6.3
      Runtime Configuration Generator.
    */

    break;

  case WorkflowState.RUNTIME_VALIDATION:

    /*
      Phase 6.4
      Runtime Validation.
    */

    break;

  case WorkflowState.ACTIVATION:

    /*
      Phase 6.5
      Retailer Activation.
    */

    break;

}

      const next =
        this.workflow.next(current);

      if (!next) {
        break;
      }

      current = next;

    }

    return {

      success: true,

      currentStep:
        WorkflowState.COMPLETED,

      message:
        "Retailer onboarding workflow completed.",

    };

  }

}