import { Intersection } from "../core/intersection.js";
import { CommandProcessor } from "../io/commandProcessor.js";
import { type Command } from "../types/command.js";
import { type JsonData } from "../types/jsonData.js";

export class SimulationEngine {
    intersection: Intersection;
    data: JsonData;
    processor: CommandProcessor;

    constructor(intersection: Intersection, data: JsonData) {
        this.intersection = intersection;
        this.data = data;
        this.processor = new CommandProcessor();
    }

    run() {
        for (const command of this.data.commands) {
            try {
                this.processCommand(command);
            } catch (error) {
                console.error(`Error processing command: ${error}`);
            }
        }

        this.intersection.display();
    }

    private processCommand(command: Command): void {
        switch (command.type) {
            case "addVehicle": {
                this.processor.handleAddVehicle(command, this.intersection);
                break;
            }
            case "step":
                this.processor.handleStep(command, this.intersection);
                break;
            default:
                console.warn(`Unknown command type: ${command}`);
                break;
        }
    }
}
