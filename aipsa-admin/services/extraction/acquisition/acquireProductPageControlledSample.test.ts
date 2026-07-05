import {
  acquireProductPageControlledSample,
} from "./acquireProductPageControlledSample";

async function runTest() {
  const productUrl =
    "https://www.next.co.uk/style/st056123/369510";

  const sampleFilePath =
    "services/extraction/acquisition/fixtures/controlled-product-sample.html";

  const result =
    await acquireProductPageControlledSample(
      productUrl,
      sampleFilePath
    );

  console.log("STATUS:", result.status);
  console.log("METHOD:", result.method);
  console.log("HTTP STATUS:", result.httpStatus);
  console.log("FINAL URL:", result.finalUrl);
  console.log("CONTENT TYPE:", result.contentType);
  console.log("HTML LENGTH:", result.html?.length ?? 0);
  console.log("ERROR:", result.error);
}

runTest();
