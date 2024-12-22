import { TrafficController } from "./trafficController.js";

import { type Intersection } from "../core/intersection.js";

export class FixedTimeController extends TrafficController {
  private stepCount: number = 0;
  private readonly STEPS_PER_CHANGE = 2;

  handleTrafficLightChange(intersection: Intersection): void {
    this.stepCount++;

    if (this.stepCount >= this.STEPS_PER_CHANGE) {
      intersection.change();
      this.stepCount = 0;
    }
  }
}
