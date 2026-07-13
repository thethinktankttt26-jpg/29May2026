import { WORKFLOW_TRANSITIONS } from "./WorkflowDefinition";
import { WorkflowState } from "./WorkflowState";

export class WorkflowEngine {

  next(
    current: WorkflowState
  ): WorkflowState | null {

    return WORKFLOW_TRANSITIONS[current];

  }

  canTransition(
    from: WorkflowState,
    to: WorkflowState
  ): boolean {

    return (
      WORKFLOW_TRANSITIONS[from] === to
    );

  }

  isCompleted(
    state: WorkflowState
  ): boolean {

    return (
      state === WorkflowState.COMPLETED
    );

  }

}