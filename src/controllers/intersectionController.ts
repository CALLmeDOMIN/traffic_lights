import { type Intersection } from "../core/intersection.js";
import { type Vehicle } from "../core/vehicle.js";
import { type Road } from "../core/road.js";
import { type Movement } from "../types/traffic.js";

export const CONFLICTING_MOVEMENTS: [Movement, Movement][] = [
  [
    { from: "north", to: "south" },
    { from: "south", to: "west" },
  ],
  [
    { from: "south", to: "north" },
    { from: "north", to: "east" },
  ],
  [
    { from: "west", to: "east" },
    { from: "east", to: "south" },
  ],
  [
    { from: "east", to: "west" },
    { from: "west", to: "north" },
  ],
];

export class IntersectionController {
  handleVehicleMovement(intersection: Intersection): void {
    Object.entries(intersection.roads)
      .filter(([, road]) => this.canProcessRoad(road))
      .forEach(([, road]) => {
        const vehicle = road.vehicles.peek();
        if (vehicle && this.canMoveVehicle(vehicle, intersection)) {
          road.removeVehicle();
        }
      });
  }

  private canProcessRoad(road: Road): boolean {
    return road.trafficLight.state === "green" && road.vehicles.size > 0;
  }

  private canMoveVehicle(
    vehicle: Vehicle,
    intersection: Intersection,
  ): boolean {
    const vehicleMovement = vehicle.movement;

    return (
      this.isValidDestination(vehicleMovement, intersection) &&
      this.hasGreenLight(vehicleMovement, intersection) &&
      !this.hasConflictingVehicles(vehicleMovement, intersection)
    );
  }

  private isValidDestination(movement: Movement, intersection: Intersection) {
    return !!intersection.roads[movement.to];
  }

  private hasGreenLight(
    movement: Movement,
    intersection: Intersection,
  ): boolean {
    return intersection.roads[movement.from].trafficLight.state === "green";
  }

  private hasConflictingVehicles(
    movement: Movement,
    intersection: Intersection,
  ): boolean {
    return Object.entries(intersection.roads)
      .filter(([direction]) => direction !== movement.from)
      .some(([, road]) => this.isConflictingRoad(road, movement));
  }

  private isConflictingRoad(road: Road, movement: Movement): boolean {
    if (road.trafficLight.state !== "green" || road.vehicles.size === 0)
      return false;

    const otherVehicle = road.vehicles.peek();

    return otherVehicle
      ? this.isConflictingMovement(movement, otherVehicle.movement)
      : false;
  }

  private isConflictingMovement(m1: Movement, m2: Movement): boolean {
    if (m1.from === m2.from || m1.to === m2.to) return true;

    return CONFLICTING_MOVEMENTS.some(
      ([conflict1, conflict2]) =>
        (this.movementEquals(m1, conflict1) &&
          this.movementEquals(m2, conflict2)) ||
        (this.movementEquals(m1, conflict2) &&
          this.movementEquals(m2, conflict1)),
    );
  }

  private movementEquals(m1: Movement, m2: Movement): boolean {
    return m1.from === m2.from && m1.to === m2.to;
  }
}
