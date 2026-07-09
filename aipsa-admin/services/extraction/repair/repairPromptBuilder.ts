import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export interface RepairPrompt {

  retailer: string;

  category: string;

  failedFields: string[];

  currentConfig: ExtractionConfigV1;

  reducedHtml: string;

}

export function buildRepairPrompt(
  retailer: string,
  category: string,
  failedFields: string[],
  currentConfig: ExtractionConfigV1,
  reducedHtml: string
): RepairPrompt {

  return {

    retailer,

    category,

    failedFields,

    currentConfig,

    reducedHtml,

  };

}