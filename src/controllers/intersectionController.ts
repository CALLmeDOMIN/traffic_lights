import { TRAFFIC_RULES, type Movement } from "../types/traffic.js";
import { type Intersection } from "../core/intersection.js";
import { type Vehicle } from "../core/vehicle.js";
import { type TrafficLight } from "../core/trafficLight.js";

export class IntersectionController {
  handleVehicleMovement(intersection: Intersection): Vehicle[] {
    const movedVehicles: Vehicle[] = [];
    const activeRoads = Object.values(intersection.roads).filter(
      (road) => road.vehicles.size() > 0,
    );

    for (const road of activeRoads) {
      const vehicle = road.vehicles.front();
      if (
        !vehicle ||
        !this.canVehicleMove(vehicle, movedVehicles, intersection)
      )
        continue;

      road.vehicles.dequeue();
      movedVehicles.push(vehicle);
    }

    return movedVehicles;
  }

  private canVehicleMove(
    vehicle: Vehicle,
    movedVehicles: Vehicle[],
    intersection: Intersection,
  ): boolean {
    const { movement } = vehicle;
    if (!intersection.roads[movement.to]) return false;

    const light = intersection.roads[movement.from].trafficLight;
    const isRightTurn = TRAFFIC_RULES.PRIORITY_TWO.has(
      `${movement.from},${movement.to}`,
    );

    if (!this.hasGreenLight(light, isRightTurn)) return false;
    if (this.hasConflictingTraffic(isRightTurn, intersection)) return false;

    return !movedVehicles.some((moved) =>
      this.isConflictingMovement(vehicle.movement, moved.movement),
    );
  }

  private hasGreenLight(light: TrafficLight, isRightTurn: boolean): boolean {
    return (
      light.state.main === "green" ||
      (isRightTurn && light.state.arrow === "on")
    );
  }

  private hasConflictingTraffic(
    isRightTurn: boolean,
    intersection: Intersection,
  ): boolean {
    if (!isRightTurn) return false;

    return Object.values(intersection.roads).some((road) => {
      const vehicle = road.vehicles.front();
      if (!vehicle) return false;

      return (
        road.trafficLight.state.main === "green" &&
        TRAFFIC_RULES.PRIORITY_ONE.has(
          `${vehicle.movement.from},${vehicle.movement.to}`,
        )
      );
    });
  }

  private isConflictingMovement(m1: Movement, m2: Movement): boolean {
    return TRAFFIC_RULES.CONFLICTS.some(
      ([c1, c2]) =>
        (this.isSameMovement(c1, m1) && this.isSameMovement(c2, m2)) ||
        (this.isSameMovement(c1, m2) && this.isSameMovement(c2, m1)),
    );
  }

  private isSameMovement(m1: Movement, m2: Movement): boolean {
    return m1.from === m2.from && m1.to === m2.to;
  }
}
