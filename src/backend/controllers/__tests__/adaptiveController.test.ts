import { beforeEach, describe, expect, test, vi } from "vitest";

import { AdaptiveController } from "../adaptiveController";
import { Intersection } from "../../core/intersection";
import { Vehicle } from "../../core/vehicle";

describe("AdaptiveController", () => {
  let controller: AdaptiveController;
  let intersection: Intersection;

  beforeEach(() => {
    controller = new AdaptiveController();
    intersection = new Intersection();
    vi.spyOn(intersection, "change");
  });

  test("should not change lights before MIN_STEPS", () => {
    controller.handleTrafficLightChange(intersection);

    expect(intersection.change).not.toHaveBeenCalled();
  });

  test("should change lights after MAX_STEPS regardless of load", () => {
    const waitingVehicle = new Vehicle("car1", "east", "west");
    intersection.roads.east.addVehicle(waitingVehicle);

    for (let i = 0; i < 8; i++) {
      controller.handleTrafficLightChange(intersection);
    }

    expect(intersection.change).toHaveBeenCalledTimes(1);
  });

  test("should change lights when waiting load exceeds threshold", () => {
    const waitingVehicle1 = new Vehicle("car1", "east", "west");
    const waitingVehicle2 = new Vehicle("car2", "east", "west");
    intersection.roads.east.addVehicle(waitingVehicle1);
    intersection.roads.east.addVehicle(waitingVehicle2);

    const currentVehicle = new Vehicle("car3", "north", "south");
    intersection.roads.north.addVehicle(currentVehicle);

    controller.handleTrafficLightChange(intersection);
    controller.handleTrafficLightChange(intersection);

    expect(intersection.change).toHaveBeenCalled();
  });

  test("should not change lights when no vehicles are waiting", () => {
    const vehicle = new Vehicle("car1", "north", "south");
    intersection.roads.north.addVehicle(vehicle);

    for (let i = 0; i < 4; i++) {
      controller.handleTrafficLightChange(intersection);
    }

    expect(intersection.change).not.toHaveBeenCalled();
  });

  test("should reset step count after changing lights", () => {
    const waitingVehicle = new Vehicle("car1", "east", "west");
    intersection.roads.east.addVehicle(waitingVehicle);

    for (let i = 0; i < 3; i++) {
      controller.handleTrafficLightChange(intersection);
    }

    expect(intersection.change).toHaveBeenCalledTimes(1);

    controller.handleTrafficLightChange(intersection);
    expect(intersection.change).toHaveBeenCalledTimes(1);
  });
});
