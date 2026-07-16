import {
  getRetailers,
} from "./retailerQueries";

import {
  Retailer,
} from "./retailerTypes";

export async function loadRetailers(): Promise<Retailer[]> {

  return await getRetailers();

}

export async function retailerExists(
  retailerId: string
): Promise<boolean> {

  const retailers =
    await loadRetailers();

  return retailers.some(
    retailer => retailer.id === retailerId
  );

}

export async function retailerEnabled(
  retailerId: string
): Promise<boolean> {

  const retailers =
    await loadRetailers();

  const retailer =
    retailers.find(
      retailer => retailer.id === retailerId
    );

  if (!retailer) {
    return false;
  }

  return retailer.is_active;

}