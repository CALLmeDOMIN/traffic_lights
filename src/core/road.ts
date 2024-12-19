import Queue from "yocto-queue";

import { TrafficLight } from "./trafficLight.js";
import { Vehicle } from "./vehicle.js";

export type Direction = "north" | "south" | "east" | "west";

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

  display() {
    console.log("Road: ", this.direction);
    console.log("Traffic Light: ", this.trafficLight.state);
    console.log("Vehicles: ", this.vehicles.size);
    for (const vehicle of this.vehicles) {
      console.log(vehicle);
    }
  }
}
