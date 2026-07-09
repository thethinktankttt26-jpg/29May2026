import {
  AiProvider,
} from "./aiProvider";

import {
  AiLearningRequest,
  AiLearningResult,
} from "./aiLearningTypes";

import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export class MockAiProvider
  implements AiProvider {

  async learn(
    request: AiLearningRequest
  ): Promise<AiLearningResult> {

    const extractionConfig: ExtractionConfigV1 = {

      contractVersion: "1.0",

      configScope: {
        type: "CATEGORY",
        category: request.category,
      },

      fields: {

        productName: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        brand: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        productIdentifier: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        currentPrice: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        originalPrice: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: false,
        },

        currency: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        primaryImage: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

        additionalImages: {
          source: "JSON_LD",
          selectors: [],
          multiple: true,
          transforms: [],
          required: false,
        },

        sizes: {
          source: "JSON_LD",
          selectors: [],
          multiple: true,
          transforms: [],
          required: true,
        },

        colours: {
          source: "JSON_LD",
          selectors: [],
          multiple: true,
          transforms: [],
          required: true,
        },

        stockAvailability: {
          source: "JSON_LD",
          selectors: [],
          multiple: false,
          transforms: [],
          required: true,
        },

      },

    };

    return {

      extractionConfig,

      confidence: 1,

      model: "MOCK",

    };

  }

}