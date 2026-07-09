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

import {
  buildRepairPrompt,
} from "./repairPromptBuilder";

export class RepairEngine {

  constructor(

    private readonly provider: RepairProvider,

  ) {}

  async repair(
    request: RepairRequest
  ): Promise<RepairResult> {

    const failedFields =
      detectFailedFields(
        request.validation
      );

    buildRepairPrompt(

      request.retailer,

      request.category,

      failedFields,

      request.currentConfig,

      request.reducedHtml,

    );

    const result =
      await this.provider.repair({

        ...request,

      });

    return {

      ...result,

      repairedFields:
        failedFields,

    };

  }

}