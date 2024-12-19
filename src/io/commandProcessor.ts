import { IntersectionController } from "../controllers/intersectionController.js";
import { TrafficLightController } from "../controllers/trafficLightController.js";
import { Intersection } from "../core/intersection.js";
import { Vehicle } from "../core/vehicle.js";
import { type AddVehicleCommand } from "../types/command.js";

export class CommandProcessor {
  private trafficLightController: TrafficLightController;
  private intersectionController: IntersectionController;

  constructor() {
    this.trafficLightController = new TrafficLightController();
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
    const beforeVehicles = this.getAllVehicles(intersection);
    this.intersectionController.handleVehicleMovement(intersection);
    this.trafficLightController.handleTrafficLightChange(intersection);
    const afterVehicles = this.getAllVehicles(intersection);

    const leftVehicles = beforeVehicles.filter(
      (id) => !afterVehicles.includes(id),
    );

    return { leftVehicles };
  }

  private getAllVehicles(intersection: Intersection): string[] {
    return Object.values(intersection.roads)
      .flatMap((road) => Array.from(road.vehicles))
      .map((vehicle) => vehicle.vehicleId);
  }
}
