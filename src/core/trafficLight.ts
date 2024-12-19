type TrafficLightState = "red" | "yellow" | "green";

export class TrafficLight {
  state: TrafficLightState;

  constructor(initialState: TrafficLightState = "red") {
    this.state = initialState;
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
