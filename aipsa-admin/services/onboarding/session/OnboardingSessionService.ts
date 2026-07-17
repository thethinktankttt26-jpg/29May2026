import {
  OnboardingSession,
} from "./OnboardingSession";

export class OnboardingSessionService {

  async start(
    retailerId: string
  ): Promise<OnboardingSession> {

    return {

      retailerId,

      status: "RUNNING",

      startedAt: new Date(),

      completedAt: null,

    };

  }

}