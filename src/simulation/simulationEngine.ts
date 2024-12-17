import { Intersection } from "../core/intersection.js";
import { CommandProcessor } from "../io/commandProcessor.js";
import { JsonData } from "../io/inputParser.js";

export class SimulationEngine {
    intersection: Intersection;
    data: JsonData;

    constructor(intersection: Intersection, data: JsonData) {
        this.intersection = intersection;
        this.data = data;
    }

    run() {
        const processor = new CommandProcessor();

        this.intersection = processor.processCommands(
            this.data,
            this.intersection
        );

        this.intersection.display();
    }
}
