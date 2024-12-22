import { IntersectionController } from "../controllers/intersectionController.js";
import { FixedTimeController } from "../controllers/fixedTimeController.js";
import { Vehicle } from "../core/vehicle.js";

import { type Intersection } from "../core/intersection.js";
import { type AddVehicleCommand } from "../types/command.js";
import { type TrafficController } from "../controllers/trafficController.js";

export class CommandProcessor {
  private trafficLightController: TrafficController;
  private intersectionController: IntersectionController;

  constructor(trafficController?: TrafficController) {
    this.trafficLightController =
      trafficController ?? new FixedTimeController();
    this.intersectionController = new IntersectionController();
  }

  handleAddVehicle(
    command: AddVehicleCommand,
    intersection: Intersection,
  ): void {
    const newVehicle = new Vehicle(
      command.vehicleId,
      command.startRoad,
      command.endRoad,
    );
    intersection.roads[command.startRoad].addVehicle(newVehicle);
  }

  handleStep(intersection: Intersection): { leftVehicles: string[] } {
    const movedVehicles =
      this.intersectionController.handleVehicleMovement(intersection);
    this.trafficLightController.handleTrafficLightChange(intersection);
    return {
      leftVehicles: movedVehicles.map((v) => v.vehicleId),
    };
  }
}
