import { supabase } from "../../services/supabase/client";

interface CreateRetailerInput {

  retailer_name: string;

  base_url: string;

  sale_url: string;

  country: string;

  status: string;

  is_active: boolean;

  categories: string[];

}

export async function createRetailer(
  input: CreateRetailerInput
) {

  // Insert retailer

  const { data, error } = await supabase

    .from("retailers")

    .insert({

      retailer_name: input.retailer_name,

      base_url: input.base_url,

      sale_url: input.sale_url,

      country: input.country,

      status: input.status,

      is_active: input.is_active,

    })

    .select()

    .single();

  if (error) {
  console.error("Retailer Insert Error:", error);
  throw error;
}

  // Insert categories

  if (input.categories.length > 0) {

    const categoryRows = input.categories.map(

      (category) => ({

        retailer_id: data.id,

        category,

      })

    );

    const { error: categoryError } =

      await supabase

        .from("retailer_categories")

        .insert(categoryRows);

    if (categoryError) {
  console.error("Category Insert Error:", categoryError);
  throw categoryError;
}

  }

  return data;

}