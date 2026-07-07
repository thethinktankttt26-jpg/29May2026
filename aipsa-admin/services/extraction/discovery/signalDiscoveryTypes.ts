export type DiscoverySignalSource =
  | "JSON_LD"
  | "META"
  | "CSS";

export interface DiscoverySignal {

  source: DiscoverySignalSource;

  path: string;

  value: string | string[];

  confidence: number;

  /**
   * Present only for JSON-LD signals.
   * Example:
   * ProductGroup
   * Product
   * Offer
   */
  jsonLdDocumentType?: string;

}

export interface SignalDiscoveryResult {

  jsonLdSignals: DiscoverySignal[];

  metaSignals: DiscoverySignal[];

  cssSignals: DiscoverySignal[];

}