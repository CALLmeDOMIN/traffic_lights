import {
  type Movement,
  type Direction,
  TRAFFIC_RULES,
} from "../types/traffic.js";

export class Vehicle {
  vehicleId: string;
  movement: Movement;
  priority: number;

  constructor(vehicleId: string, from: Direction, to: Direction) {
    this.vehicleId = vehicleId;
    this.movement = { from, to };
    this.priority = this.determinePriority(this.movement);
  }

  private determinePriority(movement: Movement): number {
    const movementString = `${movement.from},${movement.to}`;
    return TRAFFIC_RULES.PRIORITY_ONE.has(movementString) ? 1 : 2;
  }
}
