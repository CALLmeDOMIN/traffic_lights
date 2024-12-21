jest.mock("@datastructures-js/queue", () => {
  return {
    Queue: jest.fn().mockImplementation(() => ({
      enqueue: jest.fn(),
      dequeue: jest.fn(),
      size: 0,
      toArray: jest.fn().mockReturnValue([]),
    })),
  };
});

import { Queue } from "@datastructures-js/queue";
import { Road } from "../road.js";
import { TrafficLight } from "../trafficLight.js";
import { Vehicle } from "../vehicle.js";
import { type Direction } from "../../types/traffic.js";

describe("Road", () => {
  let road: Road;
  let mockQueue: jest.Mocked<Queue<Vehicle>>;

  beforeEach(() => {
    jest.clearAllMocks();
    road = new Road("north" as Direction, new TrafficLight("green"));
    mockQueue = road.vehicles as jest.Mocked<Queue<Vehicle>>;
  });

  test("constructor should initialize with given direction and traffic light", () => {
    expect(road.direction).toBe("north");
    expect(road.trafficLight.state).toBe("green");
    expect(Queue).toHaveBeenCalled();
  });

  test("constructor should initialize with default traffic light when not provided", () => {
    const roadWithDefaultLight = new Road("north" as Direction);
    expect(roadWithDefaultLight.direction).toBe("north");
    expect(roadWithDefaultLight.trafficLight).toBeInstanceOf(TrafficLight);
    expect(roadWithDefaultLight.trafficLight.state).toBe("red");
    expect(Queue).toHaveBeenCalled();
  });

  test("addVehicle should enqueue vehicle to the road", () => {
    const vehicle = new Vehicle("car1", "north", "south");
    road.addVehicle(vehicle);
    expect(mockQueue.enqueue).toHaveBeenCalledWith(vehicle);
  });

  test("removeVehicle should dequeue vehicle from the road", () => {
    const vehicle = new Vehicle("car1", "north", "south");
    mockQueue.dequeue.mockReturnValue(vehicle);
    const removed = road.removeVehicle();
    expect(mockQueue.dequeue).toHaveBeenCalled();
    expect(removed).toBe(vehicle);
  });
});
