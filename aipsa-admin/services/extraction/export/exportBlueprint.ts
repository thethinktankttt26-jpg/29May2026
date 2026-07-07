import {
  BlueprintCandidate,
  CandidateEvidence,
} from "../blueprint/candidateTypes";

import {
  ExtractionConfigV1,
  ExtractionRule,
} from "../contracts/extractionConfigV1";

function buildField(
  evidence: CandidateEvidence | null,
  multiple = false
): ExtractionRule {

  return {

    source: evidence?.source ?? "JSON_LD",

    jsonLdFilter:
      evidence?.source === "JSON_LD" &&
      evidence.jsonLdDocumentType
        ? {
            path: "@type",
            equals: evidence.jsonLdDocumentType,
          }
        : undefined,

    selectors: evidence
      ? [
          {
            selector: evidence.path,
          },
        ]
      : [],

    multiple,

    transforms: [],

    required: false,

  };

}

function getEvidence(
  candidate: BlueprintCandidate,
  fieldName: string
): CandidateEvidence | null {

  const field = candidate.fields.find(
    item => item.fieldName === fieldName
  );

  return field?.selected ?? null;

}

export function exportBlueprint(
  candidate: BlueprintCandidate
): ExtractionConfigV1 {

  return {

    contractVersion: "1.0",

    configScope: {
      type: "CATEGORY",
      category: candidate.category,
    },

    fields: {

      productName:
        buildField(
          getEvidence(candidate, "productName")
        ),

      brand:
        buildField(
          getEvidence(candidate, "brand")
        ),

      productIdentifier:
        buildField(
          getEvidence(candidate, "productIdentifier")
        ),

      currentPrice:
        buildField(
          getEvidence(candidate, "currentPrice")
        ),

      originalPrice:
        buildField(
          getEvidence(candidate, "originalPrice")
        ),

      currency:
        buildField(
          getEvidence(candidate, "currency")
        ),

      primaryImage:
        buildField(
          getEvidence(candidate, "primaryImage")
        ),

      additionalImages:
        buildField(
          getEvidence(candidate, "additionalImages"),
          true
        ),

      sizes:
        buildField(
          getEvidence(candidate, "sizes"),
          true
        ),

      colours:
        buildField(
          getEvidence(candidate, "colours"),
          true
        ),

      stockAvailability:
        buildField(
          getEvidence(candidate, "stockAvailability")
        ),

    },

  };

}