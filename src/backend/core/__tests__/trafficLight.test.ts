import { TrafficLight } from "../trafficLight";

describe("TrafficLight", () => {
  it("should initialize with default state red and arrow on", () => {
    const trafficLight = new TrafficLight();
    expect(trafficLight.state).toEqual({
      main: "red",
      arrow: "on",
    });
  });

  it("should initialize with provided main state and arrow off", () => {
    const trafficLight = new TrafficLight("green");
    expect(trafficLight.state).toEqual({
      main: "green",
      arrow: "off",
    });
  });

  it("should change from green to red with arrow", () => {
    const trafficLight = new TrafficLight("green");
    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "red",
      arrow: "on",
    });
  });

  it("should change from red+arrow to green", () => {
    const trafficLight = new TrafficLight("red");
    trafficLight.state.arrow = "on";
    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "green",
      arrow: "off",
    });
  });

  it("should change from red to green", () => {
    const trafficLight = new TrafficLight("red");
    trafficLight.state.arrow = "off";
    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "green",
      arrow: "off",
    });
  });

  it("should complete full cycle", () => {
    const trafficLight = new TrafficLight("green");

    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "red",
      arrow: "on",
    });

    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "green",
      arrow: "off",
    });

    trafficLight.change();
    expect(trafficLight.state).toEqual({
      main: "red",
      arrow: "on",
    });
  });
});

it("should maintain state integrity during transitions", () => {
  const light = new TrafficLight("green");

  for (let i = 0; i < 6; i++) {
    light.change();
    expect(["red", "green"]).toContain(light.state.main);
    expect(["on", "off"]).toContain(light.state.arrow);

    if (light.state.arrow === "on") {
      expect(light.state.main).toBe("red");
    }
  }
});

it("should handle multiple rapid state changes", () => {
  const light = new TrafficLight();
  const changes = 10;

  for (let i = 0; i < changes; i++) {
    light.change();
  }

  expect(["red", "green"]).toContain(light.state.main);
  expect(["on", "off"]).toContain(light.state.arrow);
});
