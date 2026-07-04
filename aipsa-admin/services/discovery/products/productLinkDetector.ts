export function detectProductLinks(
  links: string[]
): string[] {
  const products = new Set<string>();

  for (const link of links) {
    const url = link.toLowerCase();

    const isProductCandidate =
      url.includes("/product/") ||
      url.includes("/products/") ||
      url.includes("/p/") ||
      url.includes("/item/") ||
      url.includes("/dp/");

    if (isProductCandidate) {
      products.add(link);
    }
  }

  return Array.from(products);
}