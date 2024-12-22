import { Queue } from "@datastructures-js/queue";

import { TrafficLight } from "./trafficLight.js";

import { type Vehicle } from "./vehicle.js";
import { type Direction } from "../types/traffic.js";

export class Road {
  trafficLight: TrafficLight;
  vehicles: Queue<Vehicle>;
  direction: Direction;

  constructor(direction: Direction, trafficLight?: TrafficLight) {
    this.trafficLight = trafficLight || new TrafficLight();
    this.vehicles = new Queue();
    this.direction = direction;
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.enqueue(vehicle);
  }

  removeVehicle() {
    return this.vehicles.dequeue();
  }

  getVehiclePosition(vehicleId: string): number {
    return this.vehicles.toArray().findIndex((v) => v.vehicleId === vehicleId);
  }

  /* istanbul ignore next */
  display() {
    console.log("Road: ", this.direction);
    console.log("Traffic Light: ", this.trafficLight.state);
    console.log("Vehicles: ", this.vehicles.size());
    for (const vehicle of this.vehicles.toArray()) {
      console.log(vehicle);
    }
  }
}
