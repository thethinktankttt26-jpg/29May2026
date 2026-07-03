    import { NextResponse } from "next/server";
    import { parseHtml } from "../../../services/discovery/crawler/parseHtml";
    import { classifyLinks } from "../../../services/discovery/crawler/classifyLinks";
    import { buildBlueprint } from "../../../services/discovery/blueprint/buildBlueprint";
    import { saveBlueprint } from "../../../services/discovery/blueprint/blueprintService";


    export async function POST(request: Request) {

    try {

        const body = await request.json();

        const { url, retailerId } = body;

        const response = await fetch(url, {
    redirect: "follow",
    headers: {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    },
    });
        if (!response.ok) {

    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);

    return NextResponse.json(
        {
        error: `Retailer returned ${response.status}`,
        },
        {
        status: 500,
        }
    );

    }

    const html = await response.text();

    const parsed = parseHtml(html);

    const classified = classifyLinks(parsed.links);

    const blueprint = buildBlueprint(
    url,
    classified
    );

    await saveBlueprint(
    retailerId,
    blueprint
    );

    return NextResponse.json({

    success: true,

    title: parsed.title,

    totalLinks: parsed.links.length,

    categories: classified.categories,

    sale: classified.sale,

    products: classified.products,

    account: classified.account,

    help: classified.help,

    });

 } catch (error) {

  console.error("FULL ERROR:", error);

  return NextResponse.json(
    {
      error,
    },
    {
      status: 500,
    }
  );

}


}