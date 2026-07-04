import { supabase } from "../../supabase/client";

export async function approveBlueprint(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("retailer_blueprints")
    .update({
      status: "APPROVED",
      updated_at: new Date().toISOString(),
    })
    .eq("retailer_id", retailerId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function rejectBlueprint(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("retailer_blueprints")
    .update({
      status: "REJECTED",
      updated_at: new Date().toISOString(),
    })
    .eq("retailer_id", retailerId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}