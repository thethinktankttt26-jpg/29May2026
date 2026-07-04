import { supabase } from "../../supabase/client";
import { RetailerBlueprint } from "./buildBlueprint";

export async function saveBlueprint(
  retailerId: string,
  blueprint: RetailerBlueprint,
  version?: number
) {
  console.log("===== SAVE BLUEPRINT START =====");
  console.log("Retailer ID:", retailerId);
  console.log("Blueprint:", blueprint);
  console.log("Requested Version:", version);

const blueprintData: {
  retailer_id: string;
  blueprint: RetailerBlueprint;
  confidence_score: number;
  status: string;
  updated_at: string;
  version?: number;
} = {
  retailer_id: retailerId,
  blueprint,
  confidence_score: 100,
  status: "DRAFT",
  updated_at: new Date().toISOString(),
};

  if (version !== undefined) {
    blueprintData.version = version;
  }

  const { data, error } = await supabase
    .from("retailer_blueprints")
    .upsert(blueprintData, {
      onConflict: "retailer_id",
    })
    .select();

  console.log("Returned Data:", data);
  console.log("Supabase Error:", error);
  console.log("===== SAVE BLUEPRINT END =====");

  if (error) {
    throw error;
  }

  return data;
}