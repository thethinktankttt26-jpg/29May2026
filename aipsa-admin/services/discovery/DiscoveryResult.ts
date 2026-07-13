import {
  RetailerBlueprint,
} from "./blueprint/buildBlueprint";

import {
  ProductDiscoveryResult,
} from "./products/discoverProducts";

export interface DiscoveryResult {

  blueprint: RetailerBlueprint;

  productDiscovery:
    ProductDiscoveryResult[];

}