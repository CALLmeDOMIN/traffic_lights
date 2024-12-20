import { type Road } from "../core/road.js";

export type Direction = "north" | "south" | "east" | "west";

export type Movement = {
  from: Direction;
  to: Direction;
};

export type Roads = {
  [key in Direction]: Road;
};

export type TrafficLightState = "red" | "yellow" | "green";

export interface StepStatus {
  leftVehicles: string[];
}

export const TRAFFIC_RULES = {
  PRIORITY_ONE: new Map([
    ["north,south", true], // straight
    ["south,north", true], // straight
    ["west,east", true], // straight
    ["east,west", true], // straight
    ["north,west", true], // right turn
    ["west,south", true], // right turn
    ["south,east", true], // right turn
    ["east,north", true], // right turn
  ]),

  CONFLICTS: [
    ["north,south", "south,west"], // straight vs left
    ["south,north", "north,east"], // straight vs left
    ["west,east", "east,south"], // straight vs left
    ["east,west", "west,north"], // straight vs left
  ],
};
