import {
  DiscoveredProduct,
} from "./representativeProductTypes";

export function filterProducts(
  products:
    DiscoveredProduct[]
): DiscoveredProduct[] {

  const unique =
    new Map<
      string,
      DiscoveredProduct
    >();

  for (
    const product
    of products
  ) {

    if (
      !product.inStock
    ) {

      continue;

    }

    if (
      !unique.has(
        product.url
      )
    ) {

      unique.set(
        product.url,
        product
      );

    }

  }

  return [
    ...unique.values(),
  ];

}