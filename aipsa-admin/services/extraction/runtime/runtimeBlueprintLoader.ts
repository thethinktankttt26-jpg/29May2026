import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export interface RuntimeBlueprintLoader {

  load(
    retailer: string,
    category: string
  ): Promise<ExtractionConfigV1>;

}