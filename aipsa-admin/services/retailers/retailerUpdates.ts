import { supabase } from "../supabase/client";

interface UpdateRetailerInput {
  id: string;

  retailer_name: string;
  base_url: string;
  sale_url: string;

  country: string;

  status: string;

  is_active: boolean;

  categories: string[];
}

export async function updateRetailer(
  input: UpdateRetailerInput
) {
const { data, error } = await supabase
  .from("retailers")
  .update({
    retailer_name: input.retailer_name,
    base_url: input.base_url,
    sale_url: input.sale_url,
    country: input.country,
    status: input.status,
    is_active: input.is_active,
  })
  .eq("id", input.id)
  .select();

console.log("INPUT:", input);
console.log("UPDATED DATA:", data);
console.log("ERROR:", error);

  // Replace retailer categories

  const { error: deleteError } = await supabase
    .from("retailer_categories")
    .delete()
    .eq("retailer_id", input.id);

    console.log("Retailer updated successfully");

  if (deleteError) {
    throw deleteError;
  }

  if (input.categories.length > 0) {
    const rows = input.categories.map((category) => ({
      retailer_id: input.id,
      category,
    }));

    const { error: insertError } = await supabase
      .from("retailer_categories")
      .insert(rows);

    if (insertError) {
      throw insertError;
    }
  }
}