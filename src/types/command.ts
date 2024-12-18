import { Direction } from "../core/road.js";

interface BaseCommand {
    type: string;
}

export interface AddVehicleCommand extends BaseCommand {
    type: "addVehicle";
    vehicleId: string;
    startRoad: Direction;
    endRoad: Direction;
}

export interface StepCommand extends BaseCommand {
    type: "step";
}

export type Command = AddVehicleCommand | StepCommand;
