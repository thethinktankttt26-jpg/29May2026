import {
  filterProducts,
} from "./representativeFilters";

import {
  scoreProduct,
} from "./representativeScoring";

import {
  DiscoveredProduct,
  RepresentativeProduct,
  RepresentativeProductSet,
} from "./representativeProductTypes";

export class RepresentativeSelectionEngine {

  select(

    retailerId: string,

    category: string,

    discovered:
      DiscoveredProduct[],

    maxProducts = 5,

  ): RepresentativeProductSet {

    const filtered =
      filterProducts(
        discovered
      );

    const ranked:
      RepresentativeProduct[] =

      filtered

        .map(
          product => ({

            ...product,

            score:
              scoreProduct(
                product
              ),

          })
        )

        .sort(
          (
            a,
            b
          ) =>
            b.score -
            a.score
        )

        .slice(
          0,
          maxProducts
        );

    return {

      retailerId,

      category,

      products:
        ranked,

    };

  }

}