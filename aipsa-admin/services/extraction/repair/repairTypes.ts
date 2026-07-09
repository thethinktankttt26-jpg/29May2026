import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

import {
  BlueprintValidationResult,
} from "../validation/validationTypes";

export interface RepairRequest {

  retailer: string;

  category: string;

  reducedHtml: string;

  currentConfig: ExtractionConfigV1;

  validation: BlueprintValidationResult;

}

export interface RepairResult {

  repairedConfig: ExtractionConfigV1;

  confidence: number;

  model: string;

  repairedFields: string[];

}