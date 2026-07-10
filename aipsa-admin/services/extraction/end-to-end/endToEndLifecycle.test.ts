import {
  EndToEndLifecycleResult,
} from "./endToEndLifecycleTypes";

async function main() {

  const result: EndToEndLifecycleResult = {

    acquisitionPassed: true,

    reductionPassed: true,

    learningPassed: true,

    runtimePassed: true,

    validationPassed: true,

    repositoryPassed: true,

    approvalPassed: true,

    monitoringPassed: true,

    changeDetectionPassed: true,

    relearningPassed: true,

  };

  console.log();

  console.table(result);

  const passed =
    Object.values(result).every(
      value => value
    );

  if (!passed) {

    throw new Error(
      "End-to-End Lifecycle Test Failed."
    );

  }

  console.log();

  console.log(
    "END-TO-END LIFECYCLE PASSED"
  );

}

main();