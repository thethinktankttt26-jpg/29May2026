import { supabase } from "../../supabase/client";

export async function getBlueprint(retailerId: string) {
  const { data, error } = await supabase
    .from("retailer_blueprints")
    .select("*")
    .eq("retailer_id", retailerId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}