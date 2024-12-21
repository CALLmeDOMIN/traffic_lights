import { CommandProcessor } from "../io/commandProcessor.js";
import { OutputFormatter } from "../io/outputFormatter.js";
import { FixedTimeController } from "../controllers/fixedTimeController.js";
import { AdaptiveController } from "../controllers/adaptiveController.js";
import { InvalidCommandError } from "../errors/simulationError.js";

import { type Intersection } from "../core/intersection.js";
import { type Command } from "../types/command.js";
import type { OutputData, JsonData } from "../types/jsonData.js";
import { type StepStatus } from "../types/traffic.js";

export class SimulationEngine {
  intersection: Intersection;
  data: JsonData;
  processor: CommandProcessor;
  private stepStatuses: StepStatus[] = [];
  private formatter = new OutputFormatter();

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

  run(outputFile: string): void {
    try {
      for (const command of this.data.commands) {
        try {
          this.processCommand(command);
        } catch (error) {
          if (error instanceof InvalidCommandError) {
            console.error(`Invalid command: ${error.message}`);
            continue;
          }
          throw error;
        }
      }

      const output: OutputData = { stepStatuses: this.stepStatuses };
      this.formatter.writeOutput(output, outputFile);
    } catch (error) {
      console.error(`Fatal simulation error: ${error}`);
      throw error;
    }
  }

  getStepStatuses(): StepStatus[] {
    return this.stepStatuses;
  }

  protected processCommand(command: Command): void {
    switch (command.type) {
      case "addVehicle": {
        this.processor.handleAddVehicle(command, this.intersection);
        break;
      }
      case "step": {
        const stepStatus = this.processor.handleStep(this.intersection);
        this.stepStatuses.push(stepStatus);
        break;
      }
      default:
        throw new InvalidCommandError(command);
    }
  }
}
