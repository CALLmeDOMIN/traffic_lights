import { describe, test, expect } from "vitest";

import { Vehicle } from "../vehicle.js";
import { type Direction } from "../../types/traffic.js";

describe("Vehicle", () => {
  describe("initialization", () => {
    test("should create vehicle with correct properties", () => {
      const vehicle = new Vehicle("car1", "north", "south");
      expect(vehicle.vehicleId).toBe("car1");
      expect(vehicle.movement).toEqual({ from: "north", to: "south" });
      expect(vehicle.priority).toBeDefined();
    });
  });

  describe("movement priorities", () => {
    const testCases: [string, Direction, Direction, number][] = [
      ["straight north-south", "north", "south", 1],
      ["straight south-north", "south", "north", 1],
      ["straight east-west", "east", "west", 1],
      ["straight west-east", "west", "east", 1],

      ["right turn north-west", "north", "west", 2],
      ["right turn west-south", "west", "south", 2],
      ["right turn south-east", "south", "east", 2],
      ["right turn west-south", "west", "south", 2],

      ["left turn north-east", "north", "east", 3],
      ["left turn west-north", "west", "north", 3],
      ["left turn south-west", "south", "west", 3],
      ["left turn east-south", "east", "south", 3],

      ["invalid north-north", "north", "north", 3],
      ["invalid south-south", "south", "south", 3],
    ];

    test.each(testCases)(
      "%s should have priority %i",
      (_, from, to, expectedPriority) => {
        const vehicle = new Vehicle("test", from, to);
        expect(vehicle.priority).toBe(expectedPriority);
      },
    );
  });

  describe("vehicle identification", () => {
    test("should assign unique vehicle IDs", () => {
      const vehicle1 = new Vehicle("car1", "north", "south");
      const vehicle2 = new Vehicle("car2", "north", "south");
      expect(vehicle1.vehicleId).not.toBe(vehicle2.vehicleId);
    });
  });

  describe("movement object", () => {
    test("should create correct movement object", () => {
      const vehicle = new Vehicle("car1", "north", "south");
      expect(vehicle.movement).toHaveProperty("from", "north");
      expect(vehicle.movement).toHaveProperty("to", "south");
    });
  });
});
