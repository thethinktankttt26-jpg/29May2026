import { ClassifiedLinks } from "../crawler/classifyLinks";

export interface RetailerBlueprint {

  homepage: string;

  categories: string[];

  sale: string[];

  products: string[];

  account: string[];

  help: string[];

  discoveredAt: string;

}

export function buildBlueprint(

  homepage: string,

  classified: ClassifiedLinks

): RetailerBlueprint {

  return {

    homepage,

    categories: classified.categories,

    sale: classified.sale,

    products: classified.products,

    account: classified.account,

    help: classified.help,

    discoveredAt: new Date().toISOString(),

  };

}