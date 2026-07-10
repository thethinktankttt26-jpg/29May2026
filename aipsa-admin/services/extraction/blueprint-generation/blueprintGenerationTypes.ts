import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

import {
  RepresentativeProductSet,
} from "../representative-selection/representativeProductTypes";

export interface BlueprintGenerationRequest {

  retailerId: string;

  category: string;

  representatives:
    RepresentativeProductSet;

}

export interface BlueprintGenerationResult {

  blueprint:
    ExtractionConfigV1;

  confidence: number;

}