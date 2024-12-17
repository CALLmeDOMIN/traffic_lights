import { Intersection } from "../core/intersection.js";

export class FixedTimeController {
    Intersection: Intersection;
    time: number = 0;

    constructor(intersection: Intersection, time: number) {
        this.Intersection = intersection;
        this.time = time;
    }

    change() {
        this.time = 0;
        this.Intersection.change();
    }
}
