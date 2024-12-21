import { TrafficLight } from "../trafficLight";

describe("TrafficLight", () => {
  it("should initialize with default state 'red'", () => {
    const trafficLight = new TrafficLight();
    expect(trafficLight.state).toBe("red");
  });

  it("should initialize with provided state", () => {
    const trafficLight = new TrafficLight("green");
    expect(trafficLight.state).toBe("green");
  });

  it("should change state from 'red' to 'green'", () => {
    const trafficLight = new TrafficLight("red");
    trafficLight.change();
    expect(trafficLight.state).toBe("green");
  });

  it("should change state from 'green' to 'red'", () => {
    const trafficLight = new TrafficLight("green");
    trafficLight.change();
    expect(trafficLight.state).toBe("red");
  });

  it("should change state from 'yellow' to 'green'", () => {
    const trafficLight = new TrafficLight("yellow");
    trafficLight.change();
    expect(trafficLight.state).toBe("green");
  });
});
