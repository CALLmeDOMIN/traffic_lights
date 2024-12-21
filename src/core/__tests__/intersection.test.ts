import { Intersection } from "../intersection.js";

describe("Intersection", () => {
  let intersection: Intersection;

  beforeEach(() => {
    intersection = new Intersection();
  });

  test("should initialize with correct traffic light states", () => {
    expect(intersection.roads.north.trafficLight.state).toBe("green");
    expect(intersection.roads.south.trafficLight.state).toBe("green");
    expect(intersection.roads.east.trafficLight.state).toBe("red");
    expect(intersection.roads.west.trafficLight.state).toBe("red");
  });

  test("should initialize with empty vehicle queues", () => {
    expect(intersection.roads.north.vehicles.size()).toBe(0);
    expect(intersection.roads.south.vehicles.size()).toBe(0);
    expect(intersection.roads.east.vehicles.size()).toBe(0);
    expect(intersection.roads.west.vehicles.size()).toBe(0);
  });

  test("should change traffic light states correctly", () => {
    intersection.change();

    expect(intersection.roads.north.trafficLight.state).toBe("red");
    expect(intersection.roads.south.trafficLight.state).toBe("red");
    expect(intersection.roads.east.trafficLight.state).toBe("green");
    expect(intersection.roads.west.trafficLight.state).toBe("green");
  });

  test("should have all required roads", () => {
    const roads = Object.keys(intersection.roads);
    expect(roads).toContain("north");
    expect(roads).toContain("south");
    expect(roads).toContain("east");
    expect(roads).toContain("west");
  });
});
