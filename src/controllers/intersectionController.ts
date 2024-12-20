import { type Intersection } from "../core/intersection.js";
import { type Vehicle } from "../core/vehicle.js";
import { TRAFFIC_RULES, type Movement } from "../types/traffic.js";

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
  handleVehicleMovement(intersection: Intersection): Vehicle[] {
    const movedVehicles: Vehicle[] = [];

    const movableVehicles = Object.values(intersection.roads)
      .filter((road) => road.trafficLight.state === "green")
      .flatMap((road) => Array.from(road.vehicles))
      .sort((v1, v2) => v1.priority - v2.priority);

    for (const vehicle of movableVehicles) {
      if (this.canMoveWithoutConflicts(vehicle, movedVehicles, intersection)) {
        const road = intersection.roads[vehicle.movement.from];
        road.removeVehicle();
        movedVehicles.push(vehicle);
      }
    }

    return movedVehicles;
  }

  private canMoveWithoutConflicts(
    vehicle: Vehicle,
    movedVehicles: Vehicle[],
    intersection: Intersection,
  ): boolean {
    if (
      !this.isValidDestination(vehicle.movement, intersection) ||
      !this.hasGreenLight(vehicle.movement, intersection)
    ) {
      return false;
    }

    return !movedVehicles.some((moved) =>
      this.isConflictingMovement(vehicle.movement, moved.movement),
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

  private isConflictingMovement(m1: Movement, m2: Movement): boolean {
    const mov1 = `${m1.from},${m1.to}`;
    const mov2 = `${m2.from},${m2.to}`;

    if (m1.from === m2.from || m1.to === m2.to) return true;

    return TRAFFIC_RULES.CONFLICTS.some(
      ([c1, c2]) =>
        (mov1 === c1 && mov2 === c2) || (mov1 === c2 && mov2 === c1),
    );
  }
}
