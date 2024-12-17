import { readFileSync } from "fs";

import { Direction } from "../core/road.js";
import { Vehicle } from "../core/vehicle.js";
import { Intersection } from "../core/intersection.js";

interface AddVehicleCommand {
    type: "addVehicle";
    vehicleId: string;
    startRoad: Direction;
    endRoad: Direction;
}

interface StepCommand {
    type: "step";
}

type Command = AddVehicleCommand | StepCommand;

interface JsonData {
    commands: Command[];
}

export class InputParser {
    jsonFile: string;

    constructor(jsonFile: string) {
        this.jsonFile = jsonFile;
    }

    parse(): JsonData | null {
        try {
            const data = readFileSync(this.jsonFile, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading file: ${error}`);
            return null;
        }
    }

    processCommands(commands: Command[], intersection: Intersection): void {
        for (const command of commands) {
            switch (command.type) {
                case "addVehicle": {
                    const vehicle = new Vehicle(
                        command.vehicleId,
                        intersection.roads[command.startRoad],
                        intersection.roads[command.endRoad]
                    );
                    intersection.roads[command.startRoad].addVehicle(vehicle);
                    break;
                }
                case "step":
                    console.log("Stepping simulation");
                    break;
                default:
                    console.error(`Unknown command type: ${command}`);
            }
        }
    }
}
