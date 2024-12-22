import { type Intersection } from "../core/intersection.js";

export abstract class TrafficController {
  abstract handleTrafficLightChange(intersection: Intersection): void;
}
