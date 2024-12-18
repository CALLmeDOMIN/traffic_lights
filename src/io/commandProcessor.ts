import { Intersection } from "../core/intersection.js";
import { Vehicle } from "../core/vehicle.js";
import { type AddVehicleCommand, type StepCommand } from "../types/command.js";

export class CommandProcessor {
    handleAddVehicle(
        command: AddVehicleCommand,
        intersection: Intersection
    ): void {
        const newVehicle = new Vehicle(
            command.vehicleId,
            intersection.roads[command.startRoad],
            intersection.roads[command.endRoad]
        );

        intersection.roads[command.startRoad].addVehicle(newVehicle);
    }

    handleStep(command: StepCommand, intersection: Intersection): void {
        intersection.change();
    }
}
