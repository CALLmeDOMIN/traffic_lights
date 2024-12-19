import { type Command } from "./command.js";

export interface JsonData {
  commands: Command[];
}

export interface StepStatus {
  leftVehicles: string[];
}

export interface OutputData {
  stepStatuses: StepStatus[];
}
