import { getRetailers } from "./retailerQueries";

export async function loadRetailers() {

  return await getRetailers();

}