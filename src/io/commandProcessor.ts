import { Intersection } from "../core/intersection.js";
import { Direction } from "../core/road.js";
import { Vehicle } from "../core/vehicle.js";
import { JsonData } from "./inputParser.js";

interface AddVehicleCommand {
    type: "addVehicle";
    vehicleId: string;
    startRoad: Direction;
    endRoad: Direction;
}

interface StepCommand {
    type: "step";
}

export type Command = AddVehicleCommand | StepCommand;

export class CommandProcessor {
    processCommands(
        commands: JsonData,
        intersection: Intersection
    ): Intersection {
        for (const command of commands.commands) {
            switch (command.type) {
                case "addVehicle": {
                    this.handleAddVehicle(command, intersection);
                    break;
                }
                case "step":
                    this.handleStep(command, intersection);
                    break;
                default:
                    break;
            }
        }

        return intersection;
    }

    private handleAddVehicle(
        command: Command,
        intersection: Intersection
    ): void {
        if (command.type !== "addVehicle") {
            return;
        }

        const newVehicle = new Vehicle(
            command.vehicleId,
            intersection.roads[command.startRoad],
            intersection.roads[command.endRoad]
        );

        intersection.roads[command.startRoad].addVehicle(newVehicle);
    }

    private handleStep(command: Command, intersection: Intersection): void {
        if (command.type !== "step") {
            return;
        }

        intersection.change();
    }
}
