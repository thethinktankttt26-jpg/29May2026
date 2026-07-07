import {
  BlueprintCandidate,
  CandidateEvidence,
  CandidateField,
} from "./candidateTypes";

import {
  SignalDiscoveryResult,
  DiscoverySignal,
} from "../discovery/signalDiscoveryTypes";

function findBestSignal(
  signals: DiscoverySignal[],
  expectedPath: string
): CandidateEvidence | null {

  const match = signals.find(
    signal => signal.path === expectedPath
  );

  if (!match) {
    return null;
  }

 return {
  source: match.source,
  path: match.path,
  value: match.value,
  confidence: match.confidence,
  jsonLdDocumentType: match.jsonLdDocumentType,
};
}

function buildField(
  fieldName: string,
  signal: CandidateEvidence | null
): CandidateField {

  return {
    fieldName,
    selected: signal,
    alternatives: [],
    warnings: signal
      ? []
      : ["No matching signal discovered."],
  };

}

export function generateBlueprintCandidate(
  retailer: string,
  category: string,
  discovery: SignalDiscoveryResult
): BlueprintCandidate {

  const jsonLd = discovery.jsonLdSignals;

  return {

    retailer,

    category,

    fields: [

      buildField(
        "productName",
        findBestSignal(jsonLd, "name")
      ),

      buildField(
        "brand",
        findBestSignal(jsonLd, "brand.name")
      ),

      buildField(
        "productIdentifier",
        findBestSignal(jsonLd, "productGroupID")
      ),

      buildField(
        "currentPrice",
        findBestSignal(jsonLd, "offers.price")
      ),

      buildField(
        "originalPrice",
        null
      ),

      buildField(
        "currency",
        findBestSignal(jsonLd, "offers.priceCurrency")
      ),

      buildField(
        "primaryImage",
        findBestSignal(jsonLd, "image")
      ),

      buildField(
        "additionalImages",
        null
      ),

      buildField(
        "sizes",
        findBestSignal(jsonLd, "size")
      ),

      buildField(
        "colours",
        findBestSignal(jsonLd, "color")
      ),

      buildField(
        "stockAvailability",
        findBestSignal(jsonLd, "offers.availability")
      )

    ]

  };

}