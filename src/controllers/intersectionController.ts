import { Intersection } from "../core/intersection.js";
import { Direction } from "../core/road.js";
import { Vehicle } from "../core/vehicle.js";

export class IntersectionController {
  handleVehicleMovement(intersection: Intersection): void {
    for (const direction of Object.keys(intersection.roads) as Direction[]) {
      const road = intersection.roads[direction];

      if (road.trafficLight.state === "green" && road.vehicles.size > 0) {
        const vehicle = road.vehicles.peek();
        if (!vehicle) {
          continue;
        }

        if (this.canMoveVehicle(vehicle, intersection)) {
          road.removeVehicle();
        }
      }
    }
  }

  private canMoveVehicle(
    vehicle: Vehicle,
    intersection: Intersection,
  ): boolean {
    if (!intersection.roads[vehicle.endDirection]) {
      return false;
    }

    const startRoad = intersection.roads[vehicle.startDirection];
    if (startRoad.trafficLight.state !== "green") {
      return false;
    }

    for (const [direction, road] of Object.entries(intersection.roads)) {
      if (direction === vehicle.startDirection) continue;

      if (road.trafficLight.state === "green" && road.vehicles.size > 0) {
        const otherVehicle = road.vehicles.peek();
        if (otherVehicle && this.isConflicting(vehicle, otherVehicle)) {
          return false;
        }
      }
    }

    return true;
  }

  private isConflicting(vehicle1: Vehicle, vehicle2: Vehicle): boolean {
    const movement1 = `${vehicle1.startDirection},${vehicle1.endDirection}`;
    const movement2 = `${vehicle2.startDirection},${vehicle2.endDirection}`;

    if (movement1 === movement2) return false;

    const conflictingPairs = [
      ["north,west", "south,east"],
      ["west,south", "east,north"],
    ];

    return conflictingPairs.some(
      ([m1, m2]) =>
        (movement1 === m1 && movement2 === m2) ||
        (movement1 === m2 && movement2 === m1),
    );
  }
}
