import {
  ExtractionConfigV1,
} from "../../extraction/contracts/extractionConfigV1";

export type RuntimeConfigurationStatus =
  | "GENERATED"
  | "VALIDATED"
  | "ACTIVE";

export interface RuntimeConfiguration {

  /*
    Retailer being onboarded.
  */
  retailerId: string;

  /*
    Category this runtime configuration
    is built for.
  */
  category: string;

  /*
    Active blueprint used during runtime.
  */
  blueprintId: string;

  blueprintVersion: number;

  /*
    Validated extraction contract.
  */
  extractionConfig: ExtractionConfigV1;

  generatedAt: Date;

  status: RuntimeConfigurationStatus;

  ready: boolean;

}