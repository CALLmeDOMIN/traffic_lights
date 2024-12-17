import { TrafficLight } from "../core/trafficLight.js";

export class TrafficLightController {
    trafficLights: TrafficLight[];

    constructor(trafficLights: TrafficLight[]) {
        this.trafficLights = trafficLights;
    }

    change() {
        this.trafficLights.forEach((trafficLight) => {
            trafficLight.change();
        });
    }
}
