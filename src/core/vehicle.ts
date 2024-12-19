import type { Movement, Direction } from "../types/traffic.js";

const PRIORITY_ONE_MOVEMENTS = new Map([
  ["north,south", 1],
  ["south,north", 1],
  ["west,east", 1],
  ["east,west", 1],
  ["north,west", 1],
  ["west,south", 1],
  ["south,east", 1],
  ["east,north", 1],
]);

export class Vehicle {
  vehicleId: string;
  movement: Movement;
  priority: number;

  constructor(
    vehicleId: string,
    startDirection: Direction,
    endDirection: Direction,
  ) {
    this.vehicleId = vehicleId;
    this.movement = { from: startDirection, to: endDirection };
    this.priority = this.determinePriority(this.movement);
  }

  private determinePriority(movement: Movement): number {
    const movementString = `${movement.from},${movement.to}`;
    return PRIORITY_ONE_MOVEMENTS.get(movementString) || 2;
  }
}
