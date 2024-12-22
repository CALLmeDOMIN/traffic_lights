import { type Road } from "../core/road.js";

export type Direction = "north" | "south" | "east" | "west";

export type Movement = {
  from: Direction;
  to: Direction;
};

export type Roads = {
  [key in Direction]: Road;
};

export type MainLightState = "red" | "green";
export type ArrowState = "off" | "on";
export type TrafficLightState = {
  main: MainLightState;
  arrow: ArrowState;
};

export interface StepStatus {
  leftVehicles: string[];
}

export const TRAFFIC_RULES = {
  // straight (priority one)
  PRIORITY_ONE: new Map([
    ["north,south", true],
    ["south,north", true],
    ["west,east", true],
    ["east,west", true],
  ]),

  // Conditional right turn (priority two)
  PRIORITY_TWO: new Map([
    ["north,west", true],
    ["west,south", true],
    ["south,east", true],
    ["east,north", true],
  ]),

  // conflicting movements (priority three)
  CONFLICTS: [
    [
      { from: "north", to: "south" },
      { from: "south", to: "west" },
    ],
    [
      { from: "south", to: "north" },
      { from: "north", to: "east" },
    ],
    [
      { from: "west", to: "east" },
      { from: "east", to: "south" },
    ],
    [
      { from: "east", to: "west" },
      { from: "west", to: "north" },
    ],
    [
      { from: "north", to: "east" },
      { from: "east", to: "south" },
    ],
    [
      { from: "south", to: "west" },
      { from: "west", to: "north" },
    ],
    [
      { from: "west", to: "south" },
      { from: "south", to: "east" },
    ],
    [
      { from: "east", to: "north" },
      { from: "north", to: "west" },
    ],
  ] as [Movement, Movement][],
};
