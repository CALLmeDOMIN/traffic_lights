import {
  type Movement,
  type Direction,
  TRAFFIC_RULES,
} from "../types/traffic.js";

export class Vehicle {
  vehicleId: string;
  movement: Movement;
  priority: number = 3;

  constructor(vehicleId: string, from: Direction, to: Direction) {
    this.vehicleId = vehicleId;
    this.movement = { from, to };
    this.priority = this.determinePriority(this.movement);
  }

  /**
   * @returns
   * 1: Priority one movement (straight)
   * 2: Priority two movement (right turn or conditional right turn)
   * 3: Priority three movement (conflicting movements - left turn, u-turn)
   */
  private determinePriority(movement: Movement): number {
    const movementString = `${movement.from},${movement.to}`;
    if (TRAFFIC_RULES.PRIORITY_ONE.has(movementString)) return 1;
    if (TRAFFIC_RULES.PRIORITY_TWO.has(movementString)) return 2;
    return 3;
  }
}
