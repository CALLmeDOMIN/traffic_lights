import { writeFileSync } from "fs";
import { IntersectionController } from "./../controllers/intersectionController.js";
import { TrafficLightController } from "./../controllers/trafficLightController.js";
import { Intersection } from "../core/intersection.js";
import { CommandProcessor } from "../io/commandProcessor.js";
import { type Command } from "../types/command.js";
import { type JsonData } from "../types/jsonData.js";

export class SimulationEngine {
  intersection: Intersection;
  data: JsonData;
  processor: CommandProcessor;
  private trafficLightController: TrafficLightController;
  private intersectionController: IntersectionController;
  private stepStatuses: { leftVehicles: string[] }[] = [];

  constructor(intersection: Intersection, data: JsonData) {
    this.intersection = intersection;
    this.data = data;
    this.processor = new CommandProcessor();
    this.trafficLightController = new TrafficLightController();
    this.intersectionController = new IntersectionController();
  }

  run() {
    for (const command of this.data.commands) {
      try {
        this.processCommand(command);
      } catch (error) {
        console.error(`Error processing command: ${error}`);
      }
    }

    const output = { stepStatuses: this.stepStatuses };
    writeFileSync("output.json", JSON.stringify(output, null, 2));
  }

  private processCommand(command: Command): void {
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
        console.warn(`Unknown command type: ${command}`);
        break;
    }
  }
}
