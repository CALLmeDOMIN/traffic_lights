import { TrafficController } from "./trafficController.js";

import { type Intersection } from "../core/intersection.js";
import { type Direction } from "../types/traffic.js";

export class AdaptiveController extends TrafficController {
  private readonly MIN_STEPS = 2;
  private readonly MAX_STEPS = 8;
  private readonly LOAD_THRESHOLD = 1.5;
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

    if (waitingLoad === 0) return false;

    return (
      this.stepCount >= this.MIN_STEPS &&
      (this.stepCount >= this.MAX_STEPS ||
        waitingLoad > currentLoad * this.LOAD_THRESHOLD)
    );
  }

  private getCurrentLoad(intersection: Intersection): number {
    return this.getLoadForDirection(
      intersection,
      Object.entries(intersection.roads)
        .filter(([, road]) => road.trafficLight.state.main === "green")
        .map(([direction]) => direction) as Direction[],
    );
  }

  private getWaitingLoad(intersection: Intersection): number {
    return this.getLoadForDirection(
      intersection,
      Object.entries(intersection.roads)
        .filter(([, road]) => road.trafficLight.state.main === "red")
        .map(([direction]) => direction) as Direction[],
    );
  }

  private getLoadForDirection(
    intersection: Intersection,
    directions: Direction[],
  ): number {
    return directions.reduce(
      (sum, direction) => sum + intersection.roads[direction].vehicles.size(),
      0,
    );
  }
}
