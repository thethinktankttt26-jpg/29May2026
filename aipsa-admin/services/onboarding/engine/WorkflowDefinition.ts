import { WorkflowState } from "./WorkflowState";

export const WORKFLOW_TRANSITIONS:
  Record<WorkflowState, WorkflowState | null> = {

  [WorkflowState.DISCOVERY]:
    WorkflowState.REPRESENTATIVE_SELECTION,

  [WorkflowState.REPRESENTATIVE_SELECTION]:
    WorkflowState.BLUEPRINT_GENERATION,

  [WorkflowState.BLUEPRINT_GENERATION]:
    WorkflowState.VALIDATION,

  [WorkflowState.VALIDATION]:
    WorkflowState.APPROVAL,

  [WorkflowState.APPROVAL]:
    WorkflowState.ACTIVATION,

  [WorkflowState.ACTIVATION]:
    WorkflowState.COMPLETED,

  [WorkflowState.COMPLETED]:
    null,

};