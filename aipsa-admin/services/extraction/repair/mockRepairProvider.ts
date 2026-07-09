import {
  RepairProvider,
} from "./repairProvider";

import {
  RepairRequest,
  RepairResult,
} from "./repairTypes";

import {
  detectFailedFields,
} from "./failedFieldDetector";

export class MockRepairProvider
  implements RepairProvider {

  async repair(
    request: RepairRequest
  ): Promise<RepairResult> {

    return {

      repairedConfig:
        request.currentConfig,

      confidence: 1,

      model: "MOCK",

      repairedFields:
        detectFailedFields(
          request.validation
        ),

    };

  }

}