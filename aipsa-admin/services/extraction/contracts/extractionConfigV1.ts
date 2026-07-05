export const EXTRACTION_CONFIG_CONTRACT_VERSION = "1.0" as const;

export type ExtractionConfigContractVersion =
  typeof EXTRACTION_CONFIG_CONTRACT_VERSION;

export type ExtractionConfigScopeType =
  | "SHARED"
  | "CATEGORY";

export type ExtractionSource =
  | "CSS"
  | "JSON_LD"
  | "META";

export type ExtractionTransform =
  | "TRIM"
  | "NORMALIZE_WHITESPACE"
  | "PARSE_PRICE"
  | "PARSE_CURRENCY"
  | "NORMALIZE_URL"
  | "DEDUPLICATE";

export interface ExtractionSelector {
  selector: string;
  attribute?: string;
}

export interface ExtractionRule {
  source: ExtractionSource;
  selectors: ExtractionSelector[];
  multiple: boolean;
  transforms: ExtractionTransform[];
  required: boolean;
}

export interface ExtractionFields {
  productName: ExtractionRule;
  brand: ExtractionRule;
  productIdentifier: ExtractionRule;
  currentPrice: ExtractionRule;
  originalPrice: ExtractionRule;
  currency: ExtractionRule;
  primaryImage: ExtractionRule;
  additionalImages: ExtractionRule;
  sizes: ExtractionRule;
  colours: ExtractionRule;
  stockAvailability: ExtractionRule;
}

export type ExtractionConfigScope =
  | {
      type: "SHARED";
    }
  | {
      type: "CATEGORY";
      category: string;
    };

export interface ExtractionConfigV1 {
  contractVersion: ExtractionConfigContractVersion;
  configScope: ExtractionConfigScope;
  fields: ExtractionFields;
}
