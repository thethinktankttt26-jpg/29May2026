import {
  load,
} from "cheerio";

import {
  RuntimeContext,
} from "./runtimeContext";

export class RuntimeContextBuilder {

  build(
    html: string
  ): RuntimeContext {

    const dom =
      load(html);

    const jsonLdDocuments: unknown[] =
      [];

    dom(
      'script[type="application/ld+json"]'
    ).each(
      (_, element) => {

        try {

          const text =
            dom(element).html();

          if (!text) {
            return;
          }

          jsonLdDocuments.push(
            JSON.parse(text)
          );

        } catch {

          // Ignore invalid JSON-LD

        }

      }
    );

    const metaTags =
      new Map<
        string,
        string
      >();

    dom("meta").each(
      (_, element) => {

        const key =
          dom(element).attr("property") ??
          dom(element).attr("name");

        const value =
          dom(element).attr("content");

        if (
          key &&
          value
        ) {

          metaTags.set(
            key,
            value
          );

        }

      }
    );

    return {

      html,

      jsonLdDocuments,

      metaTags,

      dom,

    };

  }

}