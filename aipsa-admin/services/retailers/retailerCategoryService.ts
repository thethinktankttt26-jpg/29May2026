import { supabase } from "../supabase/client";

export async function getRetailerCategories(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("retailer_categories")
    .select("category")
    .eq("retailer_id", retailerId);

  if (error) {
    throw error;
  }

  return data.map((item) => item.category);
}