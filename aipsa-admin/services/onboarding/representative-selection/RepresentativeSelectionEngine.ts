import {
  RepresentativeProduct,
} from "./RepresentativeProduct";

import {
  RepresentativeSelectionRequest,
} from "./RepresentativeSelectionRequest";

import {
  RepresentativeSelectionResult,
} from "./RepresentativeSelectionResult";

export class RepresentativeSelectionEngine {

  select(
    request: RepresentativeSelectionRequest
  ): RepresentativeSelectionResult {

    if (
      request.candidates.length === 0
    ) {

      return {

        representative: null,

      };

    }

    const candidate =
      request.candidates[0];

    const representative:
      RepresentativeProduct = {

      url:
        candidate.url,

      category:
        candidate.category,

      confidence: 1,

    };

    return {

      representative,

    };

  }

}