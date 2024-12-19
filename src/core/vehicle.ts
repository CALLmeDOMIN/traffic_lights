import { Direction } from "../core/road.js";

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
  startDirection: Direction;
  endDirection: Direction;
  // priority: number;

  constructor(
    vehicleId: string,
    startDirection: Direction,
    endDirection: Direction,
  ) {
    this.vehicleId = vehicleId;
    this.startDirection = startDirection;
    this.endDirection = endDirection;
    // this.priority = this.determinePriority(startDirection, endDirection);
  }

  private determinePriority(startRoad: Direction, endRoad: Direction): number {
    const movement = `${startRoad},${endRoad}`;
    return PRIORITY_ONE_MOVEMENTS.get(movement) || 2;
  }
}
