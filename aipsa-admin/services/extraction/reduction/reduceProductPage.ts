import * as cheerio from "cheerio";

import {
  ProductPageReductionResult,
} from "./reductionTypes";

export function reduceProductPage(
  html: string
): ProductPageReductionResult {
  const originalLength = html.length;

  const $ = cheerio.load(html);

  $("script").each((_, element) => {
    const type = ($(element).attr("type") ?? "")
      .toLowerCase()
      .trim();

    if (type !== "application/ld+json") {
      $(element).remove();
    }
  });

  $(
    "style, noscript, iframe, svg, nav, footer, aside"
  ).remove();

  $("*")
    .contents()
    .filter((_, node) => node.type === "comment")
    .remove();

  $("*").each((_, element) => {
    const attributes = $(element).attr();

    if (!attributes) {
      return;
    }

    for (const attributeName of Object.keys(attributes)) {
      if (attributeName.toLowerCase().startsWith("on")) {
        $(element).removeAttr(attributeName);
      }
    }
  });

  const reducedHtml = $.html();

  const reducedLength = reducedHtml.length;

  const removedLength = Math.max(
    0,
    originalLength - reducedLength
  );

  const reductionPercentage =
    originalLength === 0
      ? 0
      : Number(
          (
            (removedLength / originalLength) *
            100
          ).toFixed(2)
        );

  return {
    html: reducedHtml,
    originalLength,
    reducedLength,
    removedLength,
    reductionPercentage,
  };
}
