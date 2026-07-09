import {
  RepairRequest,
  RepairResult,
} from "./repairTypes";

export interface RepairProvider {

  repair(
    request: RepairRequest
  ): Promise<RepairResult>;

}