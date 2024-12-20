import { writeFileSync } from "fs";
import { CommandProcessor } from "../io/commandProcessor.js";
import { FixedTimeController } from "../controllers/fixedTimeController.js";
import { AdaptiveController } from "../controllers/adaptiveController.js";

import { type Intersection } from "../core/intersection.js";
import { type Command } from "../types/command.js";
import type { OutputData, JsonData } from "../types/jsonData.js";
import { type StepStatus } from "../types/traffic.js";

export class SimulationEngine {
  intersection: Intersection;
  data: JsonData;
  processor: CommandProcessor;
  private stepStatuses: StepStatus[] = [];

  constructor(
    intersection: Intersection,
    data: JsonData,
    controllerType: "fixed" | "adaptive" = "fixed",
  ) {
    this.intersection = intersection;
    this.data = data;
    this.processor = new CommandProcessor(
      controllerType === "fixed"
        ? new FixedTimeController()
        : new AdaptiveController(),
    );
  }

  run() {
    for (const command of this.data.commands) {
      try {
        this.processCommand(command);
      } catch (error) {
        console.error(`Error processing command: ${error}`);
      }
    }

    const output: OutputData = { stepStatuses: this.stepStatuses };
    writeFileSync("output.json", JSON.stringify(output, null, 2));
  }

  private processCommand(command: Command): void {
    switch (command.type) {
      case "addVehicle": {
        this.processor.handleAddVehicle(command, this.intersection);
        break;
      }
      case "step": {
        this.intersection.display();
        const stepStatus = this.processor.handleStep(this.intersection);
        this.stepStatuses.push(stepStatus);
        break;
      }
      default:
        console.warn(`Unknown command type: ${command}`);
        break;
    }
  }
}
