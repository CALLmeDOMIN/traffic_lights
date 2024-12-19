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

export type StepStatus = {
  leftVehicles: string[];
};
