export interface RetailerFormData {
  name: string;
  baseUrl: string;
  saleUrl: string;
  country: string;
  status: string;
  categories: string[];
}

export function validateRetailer(
  form: RetailerFormData
) {

  const errors: Record<string, string> = {};

  if (!form.name.trim()) {
    errors.name = "Retailer Name is required.";
  }

  if (!form.baseUrl.trim()) {
    errors.baseUrl = "Base URL is required.";
  } else if (
    !form.baseUrl.startsWith("http://") &&
    !form.baseUrl.startsWith("https://")
  ) {
    errors.baseUrl =
      "Base URL must start with http:// or https://";
  }

  if (
    form.saleUrl &&
    !form.saleUrl.startsWith("http://") &&
    !form.saleUrl.startsWith("https://")
  ) {
    errors.saleUrl =
      "Sale URL must start with http:// or https://";
  }

  if (form.categories.length === 0) {
    errors.categories =
      "Select at least one category.";
  }

  return errors;
}