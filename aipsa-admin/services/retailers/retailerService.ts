import { supabase } from "../supabase/client";

export async function getRetailers() {

  const { data, error } =
    await supabase
      .from("retailers")
      .select("*")
      .order("retailer_name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}