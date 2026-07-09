import {
  RuntimeContext,
} from "./runtimeContext";

export class RuntimeContextBuilder {

  build(
    html: string
  ): RuntimeContext {

    return {

      html,

      jsonLdDocuments: [],

      metaTags: new Map(),

      dom: null,

    };

  }

}