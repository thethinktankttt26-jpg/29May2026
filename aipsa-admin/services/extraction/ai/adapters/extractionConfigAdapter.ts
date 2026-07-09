import {
  ExtractionConfigV1,
  ExtractionRule,
} from "../../contracts/extractionConfigV1";

import {
  BlueprintCandidate,
  CandidateField,
  CandidateEvidence,
} from "../../blueprint/candidateTypes";

function buildEvidence(
  rule: ExtractionRule
): CandidateEvidence | null {

  if (rule.selectors.length === 0) {
    return null;
  }

  return {

    source: rule.source,

    path: rule.selectors[0].selector,

    value: "",

    confidence: 100,

    jsonLdDocumentType:
      rule.jsonLdFilter?.equals,

  };

}

function buildField(
  fieldName: string,
  rule: ExtractionRule
): CandidateField {

  const selected =
    buildEvidence(rule);

  return {

    fieldName,

    selected,

    alternatives: [],

    warnings: [],

  };

}

export function extractionConfigToBlueprintCandidate(
  retailer: string,
  category: string,
  config: ExtractionConfigV1
): BlueprintCandidate {

  return {

    retailer,

    category,

    fields: [

      buildField(
        "productName",
        config.fields.productName
      ),

      buildField(
        "brand",
        config.fields.brand
      ),

      buildField(
        "productIdentifier",
        config.fields.productIdentifier
      ),

      buildField(
        "currentPrice",
        config.fields.currentPrice
      ),

      buildField(
        "originalPrice",
        config.fields.originalPrice
      ),

      buildField(
        "currency",
        config.fields.currency
      ),

      buildField(
        "primaryImage",
        config.fields.primaryImage
      ),

      buildField(
        "additionalImages",
        config.fields.additionalImages
      ),

      buildField(
        "sizes",
        config.fields.sizes
      ),

      buildField(
        "colours",
        config.fields.colours
      ),

      buildField(
        "stockAvailability",
        config.fields.stockAvailability
      ),

    ],

  };

}