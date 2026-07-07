export interface CandidateEvidence {
  source: "JSON_LD" | "META" | "CSS";

  path: string;

  value: string | string[];

  confidence: number;

  jsonLdDocumentType?: string;
}

export interface CandidateField {
  fieldName: string;

  selected: CandidateEvidence | null;

  alternatives: CandidateEvidence[];

  warnings: string[];
}

export interface BlueprintCandidate {
  retailer: string;

  category: string;

  fields: CandidateField[];
}