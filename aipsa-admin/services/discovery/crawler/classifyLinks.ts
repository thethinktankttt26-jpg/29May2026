export interface ClassifiedLinks {

  categories: string[];

  sale: string[];

  products: string[];

  account: string[];

  help: string[];

  other: string[];

}

export function classifyLinks(
  links: string[]
): ClassifiedLinks {

  const result: ClassifiedLinks = {

    categories: [],
    sale: [],
    products: [],
    account: [],
    help: [],
    other: [],

  };

  for (const link of links) {

    const url = link.toLowerCase();

    if (
      url.includes("sale") ||
      url.includes("clearance") ||
      url.includes("offers")
    ) {

      result.sale.push(link);

    }

    else if (

      url.includes("women") ||
      url.includes("men") ||
      url.includes("kids") ||
      url.includes("baby") ||
      url.includes("home")

    ) {

      result.categories.push(link);

    }

    else if (

      url.includes("/product") ||
      url.includes("/p/")

    ) {

      result.products.push(link);

    }

    else if (

      url.includes("login") ||
      url.includes("account") ||
      url.includes("signin")

    ) {

      result.account.push(link);

    }

    else if (

      url.includes("help") ||
      url.includes("contact") ||
      url.includes("delivery") ||
      url.includes("returns")

    ) {

      result.help.push(link);

    }

    else {

      result.other.push(link);

    }

  }

  return result;

}