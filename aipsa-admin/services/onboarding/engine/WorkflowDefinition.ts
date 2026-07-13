import { WorkflowState } from "./WorkflowState";

export const WORKFLOW_TRANSITIONS:
  Record<WorkflowState, WorkflowState | null> = {

  [WorkflowState.ELIGIBILITY]:
    WorkflowState.ONBOARDING_SESSION,

  [WorkflowState.ONBOARDING_SESSION]:
    WorkflowState.RUNTIME_CONFIGURATION,

  [WorkflowState.RUNTIME_CONFIGURATION]:
    WorkflowState.RUNTIME_VALIDATION,

  [WorkflowState.RUNTIME_VALIDATION]:
    WorkflowState.ACTIVATION,

  [WorkflowState.ACTIVATION]:
    WorkflowState.COMPLETED,

  [WorkflowState.COMPLETED]:
    null,

};