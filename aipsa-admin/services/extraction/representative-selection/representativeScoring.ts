import {
  DiscoveredProduct,
} from "./representativeProductTypes";

export function scoreProduct(
  product:
    DiscoveredProduct
): number {

  let score = 0;

  if (
    product.title
      .trim()
      .length > 0
  ) {

    score += 40;

  }

  if (
    product.imageUrl
  ) {

    score += 30;

  }

  if (
    product.inStock
  ) {

    score += 30;

  }

  return score;

}