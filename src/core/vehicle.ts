import { Road } from "./road.js";

export class Vehicle {
    vehicleId: string;
    startRoad: Road;
    endRoad: Road;

    constructor(vehicleId: string, startRoad: Road, endRoad: Road) {
        this.vehicleId = vehicleId;
        this.startRoad = startRoad;
        this.endRoad = endRoad;
    }

    move() {
        this.startRoad.removeVehicle();
        this.endRoad.addVehicle(this);
    }
}
