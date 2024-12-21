import { Vehicle } from "../vehicle.js";
import { type Direction } from "../../types/traffic.js";

describe("Vehicle", () => {
  const testCases: [Direction, Direction, number][] = [
    ["north", "south", 1],
    ["south", "north", 1],
    ["west", "east", 1],
    ["east", "west", 1],

    ["north", "west", 1],
    ["west", "south", 1],
    ["south", "east", 1],
    ["east", "north", 1],

    ["north", "east", 2],
    ["east", "south", 2],
    ["south", "west", 2],
    ["west", "north", 2],
  ];

  test.each(testCases)(
    "vehicle going from %s to %s should have priority %i",
    (from, to, expectedPriority) => {
      const vehicle = new Vehicle("test", from, to);
      expect(vehicle.priority).toBe(expectedPriority);
    },
  );
});
