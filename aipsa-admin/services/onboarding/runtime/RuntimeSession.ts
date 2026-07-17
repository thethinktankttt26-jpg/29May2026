import { RuntimeConfiguration } from "./RuntimeConfiguration";

export interface RuntimeSession {

  id: string;

  runtime: RuntimeConfiguration;

  activatedAt: Date;

  active: boolean;

}