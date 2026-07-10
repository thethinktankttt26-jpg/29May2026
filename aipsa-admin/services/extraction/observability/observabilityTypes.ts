export interface ExtractionMetric {

  field: string;

  extracted: boolean;

  durationMs: number;

}

export interface ObservabilityResult {

  totalFields: number;

  extractedFields: number;

  failedFields: string[];

  averageDurationMs: number;

}