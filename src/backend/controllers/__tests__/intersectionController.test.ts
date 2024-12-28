import { beforeEach, describe, expect, test } from "vitest";

import { IntersectionController } from "../intersectionController.js";
import { Intersection } from "../../core/intersection.js";
import { Vehicle } from "../../core/vehicle.js";

describe("IntersectionController", () => {
  let controller: IntersectionController;
  let intersection: Intersection;

  beforeEach(() => {
    controller = new IntersectionController();
    intersection = new Intersection();
  });

  describe("handleVehicleMovement", () => {
    test("should move vehicle with green light and no conflicts", () => {
      const vehicle = new Vehicle("car1", "north", "south");
      intersection.roads.north.addVehicle(vehicle);

      const movedVehicles = controller.handleVehicleMovement(intersection);

      expect(movedVehicles).toHaveLength(1);
      expect(movedVehicles[0]).toBe(vehicle);
      expect(intersection.roads.north.vehicles.size()).toBe(0);
    });

    test("should not move vehicle with red light", () => {
      const vehicle = new Vehicle("car1", "east", "west");
      intersection.roads.east.addVehicle(vehicle);

      const movedVehicles = controller.handleVehicleMovement(intersection);

      expect(movedVehicles).toHaveLength(0);
      expect(intersection.roads.east.vehicles.size()).toBe(1);
    });

    test("should handle right turns with arrow signal", () => {
      const vehicle = new Vehicle("car1", "north", "west");
      intersection.roads.north.addVehicle(vehicle);
      intersection.roads.north.trafficLight.change();

      const movedVehicles = controller.handleVehicleMovement(intersection);

      expect(movedVehicles).toHaveLength(1);
      expect(movedVehicles[0]).toBe(vehicle);
    });

    test("should not move vehicles with conflicting movements", () => {
      const vehicle1 = new Vehicle("car1", "north", "south");
      const vehicle2 = new Vehicle("car2", "east", "west");
      intersection.roads.north.addVehicle(vehicle1);
      intersection.roads.east.addVehicle(vehicle2);

      const movedVehicles = controller.handleVehicleMovement(intersection);

      expect(movedVehicles).toHaveLength(1);
      expect(movedVehicles[0]).toBe(vehicle1);
      expect(intersection.roads.east.vehicles.size()).toBe(1);
    });
  });
});
