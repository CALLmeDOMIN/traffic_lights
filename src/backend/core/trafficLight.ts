import {
  type MainLightState,
  type TrafficLightState,
} from "../types/traffic.js";

export class TrafficLight {
  state: TrafficLightState;

  constructor(initialState: MainLightState = "red") {
    this.state = {
      main: initialState,
      arrow: initialState === "green" ? "off" : "on",
    };
  }

  change() {
    if (this.state.main === "green") {
      this.state.main = "red";
      this.state.arrow = "on";
    } else if (this.state.main === "red") {
      this.state.main = "green";
      this.state.arrow = "off";
    }
  }
}
