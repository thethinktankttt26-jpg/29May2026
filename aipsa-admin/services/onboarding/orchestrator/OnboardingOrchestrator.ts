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

import {
  OnboardingEligibilityEngine,
} from "../eligibility";

import {
  OnboardingSessionService,
} from "../session";

import {
  RuntimeConfigurationService,
} from "../runtime";

export class OnboardingOrchestrator {

constructor(

  private readonly workflow =
    new WorkflowEngine(),

  private readonly eligibility =
    new OnboardingEligibilityEngine(),

  private readonly onboardingSession =
    new OnboardingSessionService(),

private readonly runtimeConfiguration =
  new RuntimeConfigurationService(),

) {}

  async onboard(
    request: OnboardingRequest
  ): Promise<OnboardingResult> {

    /*
      Phase 6

      Operational onboarding workflow.

      Business services will be connected
      incrementally as Phase 6 progresses.
    */

    let current =
      WorkflowState.ELIGIBILITY;

    while (
      !this.workflow.isCompleted(current)
    ) {

      switch (current) {

        case WorkflowState.ELIGIBILITY: {

          const eligibility =
            await this.eligibility.evaluate(
              request.retailerId
            );

          /*
            Phase 6.1.3

            We'll use the eligibility
            result to determine whether
            onboarding continues or stops.
          */

          void eligibility;

          break;

        }

        case WorkflowState.ONBOARDING_SESSION: {

  const session =
    await this.onboardingSession.start(
      request.retailerId
    );

  /*
    Future milestones will
    persist this session.
  */

  void session;

  break;

}

  case WorkflowState.RUNTIME_CONFIGURATION: {

  const runtime =
  await this.runtimeConfiguration.generate(
  request.retailerId,
  request.category
);

  /*
    Phase 6.4 will validate this runtime
    configuration before activation.
  */

  void runtime;

  break;

}

        case WorkflowState.RUNTIME_VALIDATION:

          /*
            Phase 6.4
            Validate runtime configuration.
          */

          break;

        case WorkflowState.ACTIVATION:

          /*
            Phase 6.5
            Activate retailer.
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