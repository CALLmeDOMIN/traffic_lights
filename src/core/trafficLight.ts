type TrafficLightState = "red" | "yellow" | "green";

export class TrafficLight {
    state: TrafficLightState = "red";

    constructor(state: TrafficLightState = "red") {
        this.state = state;
    }

    change() {
        if (this.state === "red") {
            this.state = "yellow";
            this.state = "green";
        } else if (this.state === "green") {
            this.state = "yellow";
            this.state = "red";
        } else {
            this.state = "green";
        }
    }
}
