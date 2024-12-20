import { TrafficController } from "./trafficController.js";

import { type Intersection } from "../core/intersection.js";
import { type Direction } from "../types/traffic.js";

export class AdaptiveController extends TrafficController {
  private readonly MIN_STEPS = 1;
  private readonly MAX_STEPS = 4;
  private stepCount: number = 0;

  handleTrafficLightChange(intersection: Intersection): void {
    this.stepCount++;

    if (this.shouldChange(intersection)) {
      intersection.change();
      this.stepCount = 0;
    }
  }

  private shouldChange(intersection: Intersection): boolean {
    const currentLoad = this.getCurrentLoad(intersection);
    const waitingLoad = this.getWaitingLoad(intersection);

    return (
      this.stepCount >= this.MIN_STEPS &&
      (this.stepCount >= this.MAX_STEPS || waitingLoad > currentLoad)
    );
  }

  private getCurrentLoad(intersection: Intersection): number {
    return this.getLoadForDirection(intersection, ["north", "south"] as const);
  }

  private getWaitingLoad(intersection: Intersection): number {
    return this.getLoadForDirection(intersection, ["east", "west"] as const);
  }

  private getLoadForDirection(
    intersection: Intersection,
    directions: Direction[],
  ): number {
    return directions.reduce(
      (sum, direction) => sum + intersection.roads[direction].vehicles.size,
      0,
    );
  }
}
