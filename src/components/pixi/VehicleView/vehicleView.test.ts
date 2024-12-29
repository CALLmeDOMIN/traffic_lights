import { describe, it, expect } from "vitest";

import {
  calculateMovement,
  calculatePosition,
  getIntermediatePosition,
  getEndPosition,
  getMovementAngle,
} from "./vehicleView";
import { type Direction } from "@/backend/types/traffic";

describe("calculateMovement", () => {
  it("returns target when distance is less than speed", () => {
    const current: [number, number] = [0, 0];
    const target: [number, number] = [2, 2];
    const speed = 5;
    expect(calculateMovement(current, target, speed)).toEqual(target);
  });

  it("calculates new position when distance is greater than speed", () => {
    const current: [number, number] = [0, 0];
    const target: [number, number] = [10, 0];
    const speed = 2;
    expect(calculateMovement(current, target, speed)).toEqual([2, 0]);
  });
});

describe("calculatePosition", () => {
  it("calculates queue positions correctly for each direction", () => {
    const base: [number, number] = [250, 250];
    expect(calculatePosition("north", base, 1)).toEqual([250, 225]);
    expect(calculatePosition("south", base, 1)).toEqual([250, 275]);
    expect(calculatePosition("east", base, 1)).toEqual([275, 250]);
    expect(calculatePosition("west", base, 1)).toEqual([225, 250]);
  });
});

describe("getIntermediatePosition", () => {
  it("returns center position for all straight directions", () => {
    const directions: Direction[] = ["north", "south", "east", "west"];
    directions.forEach((dir) => {
      expect(getIntermediatePosition(dir, dir)).toEqual([250, 250]);
    });
  });

  it("returns correct positions for all valid turns", () => {
    const turns = [
      { from: "north", to: "west", expected: [230, 230] },
      { from: "east", to: "north", expected: [270, 230] },
      { from: "south", to: "east", expected: [270, 270] },
      { from: "west", to: "south", expected: [230, 270] },
    ] as { from: Direction; to: Direction; expected: [number, number] }[];

    turns.forEach(({ from, to, expected }) => {
      expect(getIntermediatePosition(from, to)).toEqual(expected);
    });
  });

  it("returns default position for unhandled cases", () => {
    expect(getIntermediatePosition("north", "east")).toEqual([250, 250]);
  });

  it("returns null for opposite direction movements", () => {
    const oppositePairs = [
      ["north", "south"],
      ["east", "west"],
      ["south", "north"],
      ["west", "east"],
    ] as const;

    oppositePairs.forEach(([from, to]) => {
      expect(getIntermediatePosition(from, to)).toBeNull();
    });
  });

  it("returns correct positions for all right turns", () => {
    const rightTurns = [
      { from: "north", to: "east", expected: [250, 250] },
      { from: "east", to: "south", expected: [250, 250] },
      { from: "south", to: "west", expected: [250, 250] },
      { from: "west", to: "north", expected: [250, 250] },
    ] as const;

    rightTurns.forEach(({ from, to, expected }) => {
      expect(getIntermediatePosition(from, to)).toEqual(expected);
    });
  });
});

describe("getEndPosition", () => {
  it("calculates through movement positions", () => {
    expect(getEndPosition("north", "south")).toEqual([230, 320]);
    expect(getEndPosition("south", "north")).toEqual([270, 160]);
    expect(getEndPosition("east", "west")).toEqual([160, 230]);
    expect(getEndPosition("west", "east")).toEqual([320, 270]);
  });

  it("calculates all turn positions", () => {
    const turns = [
      { from: "north", to: "west", expected: [160, 230] },
      { from: "east", to: "north", expected: [270, 160] },
      { from: "south", to: "east", expected: [320, 270] },
      { from: "west", to: "south", expected: [250, 320] },
      { from: "north", to: "east", expected: [320, 270] },
      { from: "east", to: "south", expected: [230, 320] },
      { from: "south", to: "west", expected: [160, 230] },
      { from: "west", to: "north", expected: [270, 160] },
    ] as { from: Direction; to: Direction; expected: [number, number] }[];

    turns.forEach(({ from, to, expected }) => {
      expect(getEndPosition(from, to)).toEqual(expected);
    });
  });

  it("returns start position as fallback", () => {
    const invalidDirection = "north" as Direction;
    expect(getEndPosition(invalidDirection, invalidDirection)).toEqual([
      270, 160,
    ]);
  });

  it("handles edge cases with same direction", () => {
    const directions: Direction[] = ["north", "south", "east", "west"];

    const expected = {
      north: [270, 160],
      south: [230, 320],
      east: [320, 270],
      west: [160, 230],
    } as Record<Direction, [number, number]>;

    directions.forEach((dir) => {
      expect(getEndPosition(dir, dir)).toEqual(expected[dir]);
    });
  });
});

describe("getMovementAngle", () => {
  it("returns correct angles for each direction", () => {
    expect(getMovementAngle("north")).toBe(-Math.PI / 2);
    expect(getMovementAngle("east")).toBe(-2 * Math.PI);
    expect(getMovementAngle("south")).toBe(Math.PI / 2);
    expect(getMovementAngle("west")).toBe(Math.PI);
  });
});
