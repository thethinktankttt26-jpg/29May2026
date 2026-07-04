import { NextResponse } from "next/server";
import { discoverProducts } from "../../../../services/discovery/products/discoverProducts";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { categoryUrl } = body;

    if (!categoryUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "categoryUrl is required",
        },
        {
          status: 400,
        }
      );
    }

   const discovery = await discoverProducts(categoryUrl);

return NextResponse.json({
  success: true,
  categoryUrl,
  status: discovery.status,
  httpStatus: discovery.httpStatus,
  productCount: discovery.products.length,
  products: discovery.products,
});

  } catch (error) {
    console.error("PRODUCT DISCOVERY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to discover products",
      },
      {
        status: 500,
      }
    );
  }
}