import { readFile, writeFile, unlink } from "fs/promises";

import {
  loadExtractionConfigV1,
} from "./loadExtractionConfigV1";

async function runTest() {
  const originalPath =
    "services/extraction/configs/manual/next/clothing-v1.json";

  const tempPath =
    "services/extraction/configs/manual/next/clothing-v1.invalid.json";

  const original = await readFile(originalPath, "utf8");

  const modified = original.replace(
    '"contractVersion": "1.0"',
    '"contractVersion": "2.0"'
  );

  await writeFile(tempPath, modified);

  try {
    await loadExtractionConfigV1(tempPath);

    throw new Error(
      "Expected invalid contract version to be rejected."
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);

    console.log("ERROR:", message);

    if (
      !message.includes(
        "Unsupported extraction contract version."
      )
    ) {
      throw error;
    }

    console.log(
      "INVALID CONTRACT VERSION TEST PASSED"
    );
  } finally {
    await unlink(tempPath);
  }
}

runTest();
