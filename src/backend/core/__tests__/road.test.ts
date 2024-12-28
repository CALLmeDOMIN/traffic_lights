import { beforeEach, describe, expect, test, vi } from "vitest";
import { Queue } from "@datastructures-js/queue";

import { Road } from "../road.js";
import { TrafficLight } from "../trafficLight.js";
import { Vehicle } from "../vehicle.js";
import { type Direction } from "../../types/traffic.js";

type MockQueue = {
  enqueue: ReturnType<typeof vi.fn>;
  dequeue: ReturnType<typeof vi.fn>;
  size: number;
  toArray: ReturnType<typeof vi.fn>;
};

vi.mock("@datastructures-js/queue", () => ({
  Queue: vi.fn().mockImplementation(() => ({
    enqueue: vi.fn(),
    dequeue: vi.fn(),
    size: 0,
    toArray: vi.fn().mockReturnValue([]),
  })),
}));

describe("Road", () => {
  let road: Road;
  let mockQueue: MockQueue;

  beforeEach(() => {
    road = new Road("north" as Direction);
    mockQueue = road.vehicles as unknown as MockQueue;
  });

  test("constructor should initialize with given direction and traffic light", () => {
    expect(road.direction).toBe("north");
    expect(road.trafficLight.state.main).toBe("red");
    expect(Queue).toHaveBeenCalled();
  });

  test("constructor should initialize with default traffic light when not provided", () => {
    const roadWithDefaultLight = new Road("north" as Direction);
    expect(roadWithDefaultLight.direction).toBe("north");
    expect(roadWithDefaultLight.trafficLight).toBeInstanceOf(TrafficLight);
    expect(roadWithDefaultLight.trafficLight.state.main).toBe("red");
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
