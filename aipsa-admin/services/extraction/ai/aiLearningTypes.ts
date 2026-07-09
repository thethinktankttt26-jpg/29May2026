import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export interface AiLearningRequest {

  retailer: string;

  category: string;

  reducedHtml: string;

}

export interface AiLearningResult {

  extractionConfig: ExtractionConfigV1;

  confidence: number;

  model: string;

}