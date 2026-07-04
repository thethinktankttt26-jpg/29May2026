import { ClassifiedLinks } from "../crawler/classifyLinks";
import { getRetailerCategories } from "../../retailers/retailerCategoryService";

export interface RetailerBlueprint {
  homepage: string;

  categories: string[];

  sale: string[];

  products: string[];

  account: string[];

  help: string[];

  discoveredAt: string;
}

export async function buildBlueprint(
  retailerId: string,
  homepage: string,
  classified: ClassifiedLinks
): Promise<RetailerBlueprint> {
  const retailerCategories =
    await getRetailerCategories(retailerId);

  console.log(
    "Configured Retailer Categories:",
    retailerCategories
  );

  return {
    homepage,

    categories: retailerCategories,

    sale: classified.sale,

    products: classified.products,

    account: classified.account,

    help: classified.help,

    discoveredAt: new Date().toISOString(),
  };
}