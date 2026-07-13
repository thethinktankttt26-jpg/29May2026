import {
  DiscoveryRequest,
} from "./DiscoveryRequest";

import {
  DiscoveryResult,
} from "./DiscoveryResult";

import {
  fetchHtml,
} from "./crawler/fetchHtml";

import {
  parseHtml,
} from "./crawler/parseHtml";

import {
  classifyLinks,
} from "./crawler/classifyLinks";

import {
  buildBlueprint,
} from "./blueprint/buildBlueprint";

import {
  discoverProducts,
} from "./products/discoverProducts";

export class DiscoveryEngine {

  async execute(
    request: DiscoveryRequest
  ): Promise<DiscoveryResult> {

    /*
      Existing Phase 5 flow

      Homepage

      ↓

      Download

      ↓

      Parse

      ↓

      Classify

      ↓

      Build Blueprint

      ↓

      Product Discovery
    */

    const html =
      await fetchHtml(
        request.homepageUrl
      );

    const parsed =
      parseHtml(html);

    const classified =
      classifyLinks(
        parsed.links
      );

    const blueprint =
      await buildBlueprint(

        request.retailerId,

        request.homepageUrl,

        classified,

      );

    const productDiscovery =
      await Promise.all(

        blueprint.categories.map(

          (categoryUrl) =>

            discoverProducts(
              categoryUrl
            )

        )

      );

    return {

      blueprint,

      productDiscovery,

    };

  }

}