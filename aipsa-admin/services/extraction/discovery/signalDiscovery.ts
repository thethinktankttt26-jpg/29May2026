import {
  SignalDiscoveryResult,
} from "./signalDiscoveryTypes";

import {
  discoverJsonLdSignals,
} from "./discoverJsonLdSignals";

export function discoverSignals(
  html: string
): SignalDiscoveryResult {

  const jsonLdSignals =
    discoverJsonLdSignals(html);

  return {

    jsonLdSignals,

    metaSignals: [],

    cssSignals: [],

  };

}