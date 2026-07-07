import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export type BlueprintStatus =
  | "DRAFT"
  | "REVIEW"
  | "ACTIVE"
  | "ARCHIVED";

export type BlueprintCreatedBy =
  | "AI"
  | "ADMIN";

export interface BlueprintRecord {

  id: string;

  retailerId: string;

  category: string;

  version: number;

  status: BlueprintStatus;

  confidence: number;

  extractionConfig: ExtractionConfigV1;

  createdBy: BlueprintCreatedBy;

  notes: string | null;

  createdAt: Date;

  activatedAt: Date | null;

  archivedAt: Date | null;

}