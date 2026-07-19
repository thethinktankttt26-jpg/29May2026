import {
  loadRetailers,
} from "@/services/retailers/retailerService";

import {
  RuntimeExtractionRequest,
} from "./RuntimeExtractionRequest";

export class RetailerResolver {

  async resolve(
    request: RuntimeExtractionRequest
  ): Promise<string> {

    const hostname =
      new URL(request.productUrl).hostname
        .replace(/^www\./, "");

    const retailers =
      await loadRetailers();

    const retailer =
      retailers.find(retailer => {

        const retailerHost =
          new URL(retailer.base_url)
            .hostname
            .replace(/^www\./, "");

        return retailerHost === hostname;

      });

    if (!retailer) {

      throw new Error(
        `No active retailer found for ${request.productUrl}`
      );

    }

    return retailer.id;

  }

}