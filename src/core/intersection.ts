import { Road } from "./road.js";
import { TrafficLight } from "./trafficLight.js";

type Roads = {
    north: Road;
    south: Road;
    east: Road;
    west: Road;
};

export class Intersection {
    roads: Roads;

    constructor() {
        this.roads = {
            north: new Road("north", new TrafficLight("green")),
            south: new Road("south", new TrafficLight("green")),
            east: new Road("east", new TrafficLight("red")),
            west: new Road("west", new TrafficLight("red"))
        };
    }

    change() {
        this.roads.north.trafficLight.change();
        this.roads.south.trafficLight.change();
        this.roads.east.trafficLight.change();
        this.roads.west.trafficLight.change();
    }

    display() {
        console.log("\nIntersection\n======");
        this.roads.north.display();
        this.roads.south.display();
        this.roads.east.display();
        this.roads.west.display();
        console.log("======");
    }
}
