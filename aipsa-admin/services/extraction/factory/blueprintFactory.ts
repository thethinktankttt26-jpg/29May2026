import {
  discoverSignals,
} from "../discovery/signalDiscovery";

import {
  generateBlueprintCandidate,
} from "../blueprint/generateBlueprintCandidate";

import {
  validateBlueprintCandidate,
} from "../validation/validateBlueprintCandidate";

import {
  approveBlueprintCandidate,
} from "../approval/approveBlueprintCandidate";

import {
  exportBlueprint,
} from "../export/exportBlueprint";

import {
  BlueprintFactoryResult,
} from "./blueprintFactoryTypes";

export function runBlueprintFactory(
  retailer: string,
  category: string,
  html: string
): BlueprintFactoryResult {

  const discovery =
    discoverSignals(html);

  const candidate =
    generateBlueprintCandidate(
      retailer,
      category,
      discovery
    );

  const validation =
    validateBlueprintCandidate(candidate);

  const approval =
    approveBlueprintCandidate(validation);

  const extractionConfig =
    exportBlueprint(candidate);

  return {
    candidate,
    validation,
    approval,
    extractionConfig,
  };

}