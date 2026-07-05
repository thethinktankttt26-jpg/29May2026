import {
  ExtractionConfigV1,
  EXTRACTION_CONFIG_CONTRACT_VERSION,
} from "./extractionConfigV1";

const validConfig: ExtractionConfigV1 = {
  contractVersion: EXTRACTION_CONFIG_CONTRACT_VERSION,

  configScope: {
    type: "CATEGORY",
    category: "Clothing",
  },

  fields: {
    productName: {
      source: "CSS",
      selectors: [{ selector: "h1" }],
      multiple: false,
      transforms: ["TRIM"],
      required: true,
    },

    brand: {
      source: "META",
      selectors: [{ selector: "meta", attribute: "content" }],
      multiple: false,
      transforms: ["TRIM"],
      required: false,
    },

    productIdentifier: {
      source: "JSON_LD",
      selectors: [{ selector: "sku" }],
      multiple: false,
      transforms: ["TRIM"],
      required: true,
    },

    currentPrice: {
      source: "CSS",
      selectors: [{ selector: ".price" }],
      multiple: false,
      transforms: ["PARSE_PRICE"],
      required: true,
    },

    originalPrice: {
      source: "CSS",
      selectors: [{ selector: ".original-price" }],
      multiple: false,
      transforms: ["PARSE_PRICE"],
      required: false,
    },

    currency: {
      source: "JSON_LD",
      selectors: [{ selector: "offers.priceCurrency" }],
      multiple: false,
      transforms: ["PARSE_CURRENCY"],
      required: true,
    },

    primaryImage: {
      source: "META",
      selectors: [{ selector: "meta", attribute: "content" }],
      multiple: false,
      transforms: ["NORMALIZE_URL"],
      required: true,
    },

    additionalImages: {
      source: "CSS",
      selectors: [{ selector: "img", attribute: "src" }],
      multiple: true,
      transforms: ["NORMALIZE_URL", "DEDUPLICATE"],
      required: false,
    },

    sizes: {
      source: "CSS",
      selectors: [{ selector: ".size" }],
      multiple: true,
      transforms: ["TRIM", "DEDUPLICATE"],
      required: false,
    },

    colours: {
      source: "CSS",
      selectors: [{ selector: ".colour" }],
      multiple: true,
      transforms: ["TRIM", "DEDUPLICATE"],
      required: false,
    },

    stockAvailability: {
      source: "JSON_LD",
      selectors: [{ selector: "offers.availability" }],
      multiple: false,
      transforms: ["TRIM"],
      required: true,
    },
  },
};

console.log(validConfig.contractVersion);
