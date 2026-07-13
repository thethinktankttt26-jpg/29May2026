import { WorkflowState } from "./WorkflowState";

export interface WorkflowTransition {

  from: WorkflowState;

  to: WorkflowState;

}