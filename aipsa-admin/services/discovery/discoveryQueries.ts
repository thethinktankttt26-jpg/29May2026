import { supabase } from "../supabase/client";

export async function getDiscoveryStatus() {

  const { data, error } = await supabase
    .from("retailer_discovery")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}