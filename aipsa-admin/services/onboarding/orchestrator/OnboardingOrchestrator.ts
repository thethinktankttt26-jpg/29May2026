import {
  RepresentativeSelectionEngine,
} from "../representative-selection";

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

    private readonly representativeSelection =
      new RepresentativeSelectionEngine(),

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
      WorkflowState.DISCOVERY;

    while (
      !this.workflow.isCompleted(
        current
      )
    ) {

      switch (current) {

        case WorkflowState.DISCOVERY:

          /*
            Phase 6.5
            Discovery integration.
          */

          break;

        case WorkflowState.REPRESENTATIVE_SELECTION:

          this.representativeSelection.select({

            retailerId:
              request.retailerId,

            candidates: [],

          });

          break;

        case WorkflowState.BLUEPRINT_GENERATION:

          /*
            Connect Blueprint Factory.
          */

          break;

        case WorkflowState.VALIDATION:

          /*
            Connect Validation Engine.
          */

          break;

        case WorkflowState.APPROVAL:

          /*
            Connect Approval Workflow.
          */

          break;

        case WorkflowState.ACTIVATION:

          /*
            Connect Repository Activation.
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