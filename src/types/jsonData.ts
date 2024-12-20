import { type Command } from "./command.js";
import { StepStatus } from "./traffic.js";

export interface JsonData {
  commands: Command[];
}

export interface OutputData {
  stepStatuses: StepStatus[];
}
