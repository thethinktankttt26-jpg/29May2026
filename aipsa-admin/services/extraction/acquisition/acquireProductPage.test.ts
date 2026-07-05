import {
  acquireProductPage,
} from "./acquireProductPage";

async function runTest() {
  const productUrl =
    "https://www.next.co.uk/style/st056123/369510";

  const result = await acquireProductPage(productUrl, {
    controlledSampleFilePath:
      "services/extraction/acquisition/fixtures/controlled-product-sample.html",
  });

  console.log("FINAL STATUS:", result.status);
  console.log("FINAL METHOD:", result.method);
  console.log("HTTP STATUS:", result.httpStatus);
  console.log("FINAL URL:", result.finalUrl);
  console.log("CONTENT TYPE:", result.contentType);
  console.log("HTML LENGTH:", result.html?.length ?? 0);
  console.log("ERROR:", result.error);
}

runTest();
