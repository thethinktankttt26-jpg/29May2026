import {
  AiLearningRequest,
  AiLearningResult,
} from "./aiLearningTypes";

export interface AiProvider {

  learn(
    request: AiLearningRequest
  ): Promise<AiLearningResult>;

}