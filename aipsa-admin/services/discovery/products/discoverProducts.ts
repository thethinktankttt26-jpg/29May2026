import { parseHtml } from "../crawler/parseHtml";
import { detectProductLinks } from "./productLinkDetector";

export type ProductDiscoveryResult = {
  status: "SUCCESS" | "BLOCKED" | "FETCH_FAILED";
  httpStatus: number;
  products: string[];
};

export async function discoverProducts(
  categoryUrl: string
): Promise<ProductDiscoveryResult> {
  try {
    const response = await fetch(categoryUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (response.status === 401 || response.status === 403) {
      console.log(
        "PRODUCT DISCOVERY BLOCKED:",
        categoryUrl,
        response.status
      );

      return {
        status: "BLOCKED",
        httpStatus: response.status,
        products: [],
      };
    }

    if (!response.ok) {
      console.log(
        "PRODUCT DISCOVERY FETCH FAILED:",
        categoryUrl,
        response.status
      );

      return {
        status: "FETCH_FAILED",
        httpStatus: response.status,
        products: [],
      };
    }

    const html = await response.text();

    const parsed = parseHtml(html);

    const products = detectProductLinks(parsed.links);

    console.log(
      "PRODUCT DISCOVERY CATEGORY:",
      categoryUrl
    );

    console.log(
      "PRODUCT DISCOVERY TOTAL LINKS:",
      parsed.links.length
    );

    console.log(
      "PRODUCT LINKS FOUND:",
      products.length
    );

    return {
      status: "SUCCESS",
      httpStatus: response.status,
      products,
    };
  } catch (error) {
    console.error(
      "PRODUCT DISCOVERY REQUEST ERROR:",
      categoryUrl,
      error
    );

    return {
      status: "FETCH_FAILED",
      httpStatus: 0,
      products: [],
    };
  }
}