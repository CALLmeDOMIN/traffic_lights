import { Intersection } from "../core/intersection.js";

const STEPS_PER_CHANGE = 2;

export class TrafficLightController {
  private stepCount: number = 0;

  handleTrafficLightChange(intersection: Intersection): void {
    this.stepCount++;

    if (this.stepCount >= STEPS_PER_CHANGE) {
      intersection.change();
      this.stepCount = 0;
    }
  }
}
